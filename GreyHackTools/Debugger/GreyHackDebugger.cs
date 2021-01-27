using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using GreyHackTools.Debugger;
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
			Intrinsic intrinsic = Intrinsic.Create("md5");
			intrinsic.AddParam("value");
			intrinsic.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
			{
				ValString valString = context.GetVar("value") as ValString;
				if (valString == null)
				{
					throw new RuntimeException("md5: Invalid arguments");
				}

				return new Intrinsic.Result(MD5.Calculate(new UTF8Encoding().GetBytes(valString.value)).PadLeft(32, '0'));
				
			};
			Intrinsic intrinsic2 = Intrinsic.Create("reverse");
			intrinsic2.AddParam("self");
			intrinsic2.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
			{
				Value var = context.GetVar("self");
				if (var is ValList)
				{
					((ValList)var).values.Reverse();
				}
				return Intrinsic.Result.Null;
			};
			Intrinsic intrinsic3 = Intrinsic.Create("join");
			intrinsic3.AddParam("self");
			intrinsic3.AddParam("delimiter", " ");
			intrinsic3.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
			{
				Value var = context.GetVar("self");
				string text = context.GetVar("delimiter").ToString();
				if (!(var is ValList))
				{
					return new Intrinsic.Result(var, true);
				}
				ValList valList = var as ValList;
				if ((long)valList.values.Count > 1000000L)
				{
					throw new RuntimeException("join: string too large");
				}
				if (text.Length > 128)
				{
					throw new RuntimeException("join: delimiter too large");
				}
				List<string> list = new List<string>(valList.values.Count);
				for (int i = 0; i < valList.values.Count; i++)
				{
					if (valList.values[i] == null)
					{
						list.Add("null");
					}
					else
					{
						list.Add(valList.values[i].ToString());
					}
				}
				return new Intrinsic.Result(string.Join(text, list.ToArray()));
			};
			Intrinsic intrinsic4 = Intrinsic.Create("split");
			intrinsic4.AddParam("self");
			intrinsic4.AddParam("pattern");
			intrinsic4.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
			{
				Value var = context.GetVar("self");
				ValString valString = context.GetVar("pattern") as ValString;
				if (var is ValString && valString != null)
				{
					string value = valString.value;
					if (string.IsNullOrEmpty(value))
					{
						throw new RuntimeException("split: Invalid arguments");
					}
					string value2 = ((ValString)var).value;
					try
					{
						string[] array = Regex.Split(value2, value.Replace(".", "\\."));
						List<Value> list = new List<Value>(array.Length);
						for (int i = 0; i < array.Length; i++)
						{
							list.Add(new ValString(array[i]));
						}
						return new Intrinsic.Result(new ValList(list), true);
					}
					catch (Exception ex)
					{
						throw new RuntimeException(ex.Message);
					}
				}
				return Intrinsic.Result.Null;
			};
			Intrinsic intrinsic5 = Intrinsic.Create("replace");
			intrinsic5.AddParam("self");
			intrinsic5.AddParam("oldval");
			intrinsic5.AddParam("newval");
			intrinsic5.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
			{
				Value var = context.GetVar("self");
				if (!(var is ValString))
				{
					throw new TypeException("Type Error: 'replace' requires string");
				}
				Value var2 = context.GetVar("oldval");
				Value var3 = context.GetVar("newval");
				if (var2 == null || var3 == null)
				{
					throw new TypeException("replace: Invalid arguments");
				}
				string text = var.ToString();
				string text2 = var2.ToString();
				string text3 = var3.ToString();
				if (string.IsNullOrEmpty(text2))
				{
					throw new TypeException("Type Error: 'replace' oldVal can't be empty or null");
				}
				if (string.IsNullOrEmpty(text))
				{
					return new Intrinsic.Result(text);
				}
				int num = 0;
				while(true)
				{
					num = text.IndexOf(text2, num, StringComparison.Ordinal);
					if (num < 0)
					{
						break;
					}
					text = text.Substring(0, num) + text3 + text.Substring(num + text2.Length);
					num += text3.Length;
				}
				return new Intrinsic.Result(text);
			};
			Intrinsic intrinsic6 = Intrinsic.Create("trim");
			intrinsic6.AddParam("self");
			intrinsic6.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
			{
				Value var = context.GetVar("self");
				if (var is ValString)
				{
					return new Intrinsic.Result(((ValString)var).value.Trim());
				}
				return Intrinsic.Result.Null;
			};
			Intrinsic intrinsic7 = Intrinsic.Create("lastIndexOf");
			intrinsic7.AddParam("self");
			intrinsic7.AddParam("searchStr");
			intrinsic7.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
			{
				Value var = context.GetVar("self");
				ValString valString = context.GetVar("searchStr") as ValString;
				if (var is ValString && valString != null)
				{
					string value = valString.value;
					return new Intrinsic.Result((double)((ValString)var).value.LastIndexOf(value, StringComparison.Ordinal));
				}
				return Intrinsic.Result.Null;
			};
			Intrinsic intrinsic8 = Intrinsic.Create("to_int");
			intrinsic8.AddParam("self");
			intrinsic8.AddParam("value", new ValString(""));
			intrinsic8.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
			{
				Value var = context.GetVar("self");
				if (!(var is ValString))
				{
					return Intrinsic.Result.Null;
				}
				string text = var.ToString();
				int num;
				if (!string.IsNullOrEmpty(text) && int.TryParse(text, out num))
				{
					return new Intrinsic.Result((double)num);
				}
				return new Intrinsic.Result(var.ToString());
			};
			Intrinsic intrinsic9 = Intrinsic.Create("typeof");
            intrinsic9.AddParam("type_object");
            intrinsic9.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                Value var = context.GetVar("type_object");
                if (var == null)
                {
                    return new Intrinsic.Result("null");
                }
                string resultStr = "undefined";
                if (var is ValString)
                {
                    resultStr = "string";
                }
                else if (var is ValList)
                {
                    resultStr = "list";
                }
                else if (var is ValMap)
                {
                    ValMap valMap = var as ValMap;
                    if (valMap.ContainsKey("classID"))
                    {
                        resultStr = valMap["classID"].ToString();
                    }
                    else
                    {
                        resultStr = "map";
                    }
                }
                else if (var is ValNumber)
                {
                    resultStr = "number";
                }
                else if (var is ValFunction)
                {
                    resultStr = "function";
                }
                return new Intrinsic.Result(resultStr);
            };
			Intrinsic.Create("clear_screen").code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                return Intrinsic.Result.Null;
            };
            Intrinsic intrinsic10 = Intrinsic.Create("exit");
            intrinsic10.AddParam("msg", new ValString(""));
            intrinsic10.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                Value var = context.GetVar("msg");
                if (var != null)
                {
                    context.vm.standardOutput(var.ToString());
                }
                context.interpreter.vm.Stop();
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
