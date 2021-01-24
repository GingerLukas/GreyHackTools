using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Miniscript;

namespace GreyHackTools
{
    public class GreyHackDebugger
    {
        public bool AutomaticallyClearDebugVariables { get; set; } = true;
        public bool Running => !_debugerTask.IsCompleted;
        
        
        public delegate void DebuggerEndedHandler(GreyHackDebugger debugger);
        public event DebuggerEndedHandler Ended;

        public delegate void DebuggerStartedHandler(GreyHackDebugger debugger);
        public event DebuggerStartedHandler Started;

        public delegate void DebuggerRuntimeErrorHandler(GreyHackDebugger debugger, Exception exception);
        public event DebuggerRuntimeErrorHandler RuntimeError;

        public delegate void DebuggerStepHandler(GreyHackDebugger debugger, TAC.Context context, int lastLine, int currentLine);
        public event DebuggerStepHandler Step;

        private bool _forceStopped = false;

        public Interpreter Interpreter = new Interpreter();
        public int Line = 0;
        public string[] CodeLines;
        private bool _debuggerActive = false;
        public HashSet<int> BreakpointLines = new HashSet<int>();
        public BindingList<DebugVariable> DebugVariables = new BindingList<DebugVariable>();
        private EventWaitHandle _debugWaitHandle = new EventWaitHandle(false, EventResetMode.AutoReset);
        private Task _debugerTask = Task.CompletedTask;

        private bool _intrisicsAdded = false;
        public GreyHackDebugger()
        {
            if (!_intrisicsAdded)
            {
                AddIntrisics();
                _intrisicsAdded = true;
            }
        }

        public void Start()
        {
            if (!_debugerTask.IsCompleted) return;

            Started?.Invoke(this);

            _debugerTask = Task.Run(() =>
            {
                Line = 0;
                _debuggerActive = false;
                
                try
                {
                    Interpreter.RunUntilDone(Double.PositiveInfinity, true, m =>
                    {
                        TAC.Context context = m.stack.Peek();

                        if (context.code[context.lineNum].location == null || context.lineNum >= context.code.Count || context.code[context.lineNum].location.lineNum == Line)
                        {
                            _debugWaitHandle.Set();
                            return;
                        }

                        //check if code line location changed
                        int lastLine = Line;
                        Line = context.code[context.lineNum].location.lineNum;
                        if (!(_debuggerActive || BreakpointLines.Contains(Line)))
                        {
                            _debugWaitHandle.Set();
                            return;
                        }

                        _debuggerActive = true;

                        if(AutomaticallyClearDebugVariables) DebugVariables.Clear();
                        Step?.Invoke(this,context, lastLine, Line);
                    }, _debugWaitHandle);
                }
                catch (Exception e)
                {
                    if (!_forceStopped) RuntimeError?.Invoke(this, e);
                }

                Ended?.Invoke(this);
                _forceStopped = false;
            });
        }

        public void NextStep()
        {
            _debugWaitHandle.Set();
        }

        public void Continue()
        {
            _debuggerActive = false;
            _debugWaitHandle.Set();
        }

        public void Stop()
        {
            Interpreter.Stop();
            _forceStopped = true;
            _debugWaitHandle.Set();
        }

        private void AddIntrisics()
        {
            Intrinsic bitwise = Intrinsic.Create("bitwise");
            bitwise.AddParam("operator");
            bitwise.AddParam("num1");
            bitwise.AddParam("num2");
            bitwise.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                ValString valString = context.GetVar("operator") as ValString;
                ValNumber valNumber = context.GetVar("num1") as ValNumber;
                ValNumber valNumber2 = context.GetVar("num2") as ValNumber;
                if (valString == null || valNumber == null)
                {
                    return Intrinsic.Result.Null;
                }
                string value = valString.value;
                int num = valNumber.IntValue();
                if (value == "~")
                {
                    return new Intrinsic.Result((double)(~num));
                }
                if (valNumber2 == null)
                {
                    return Intrinsic.Result.Null;
                }
                int num2 = valNumber2.IntValue();
                if (value == "&")
                {
                    return new Intrinsic.Result((double)(num & num2));
                }
                if (value == "|")
                {
                    return new Intrinsic.Result((double)(num | num2));
                }
                if (value == "^")
                {
                    return new Intrinsic.Result((double)(num ^ num2));
                }
                if (value == "<<")
                {
                    return new Intrinsic.Result((double)(num << num2));
                }
                if (value == ">>")
                {
                    return new Intrinsic.Result((double)(num >> num2));
                }
                if (value == ">>>")
                {
                    return new Intrinsic.Result((double)((uint)num >> num2));
                }
                return Intrinsic.Result.Null;
            };
        }

    }
    public class DebugVariable
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
