using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using GreyHackTools.Debugger;
using GreyHackTools.Debugger.GreyHackEmulation;
using Miniscript;

namespace GreyHackTools
{
    public class GreyHackDebugger
    {
        public RuntimeContext RuntimeContext { get; set; } = new RuntimeContext();
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
            if (Running) return;

            Started?.Invoke(this);

            _debugerTask = Task.Run(Run);
        }

        private void Run()
        {
            Line = 0;
            _debuggerActive = false;

            try
            {
                Interpreter.RunUntilDone(Double.PositiveInfinity, true, async m =>

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

                    if (AutomaticallyClearDebugVariables) DebugVariables.Clear();
                    Step?.Invoke(this, context, lastLine, Line);
                }, _debugWaitHandle);
            }
            catch (Exception e)
            {
                if (!_forceStopped) RuntimeError?.Invoke(this, e);
            }

            Ended?.Invoke(this);
            _forceStopped = false;
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
            
            Intrinsic.Create("current_date").code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                var date = DateTime.Now;
                return new Intrinsic.Result($"{date.Day}-{date.Month}-{date.Year} {date.Hour:D2}:{date.Minute:D2}");
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

            Intrinsic intrinsic11 = Intrinsic.Create("nslookup");
            intrinsic11.AddParam("address");
            intrinsic11.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                ValString valString = context.GetVar("address") as ValString;
                string resultStr = "Not found";
                if (valString == null || string.IsNullOrEmpty(valString.value))
                {
                    throw new RuntimeException("nslookup: Invalid arguments");
                }

                int first = RuntimeContext.random.Next() % 255 + 1;
                int second = RuntimeContext.random.Next() % 255 + 1;
                if (IP.LocalRanges.Contains(first+"."+second))
                {
                    first++;
                }

                return new Intrinsic.Result(IP.RandomPublicIp(RuntimeContext.random).ToString());
            };

            Intrinsic.Create("active_user").code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                return new Intrinsic.Result(RuntimeContext.ActiveUser);
            };
            Intrinsic.Create("home_dir").code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                return new Intrinsic.Result(
                    RuntimeContext.ActiveUser.Equals("root") ? "/root" : ("/home/" + RuntimeContext.ActiveUser));
            };

            Intrinsic intrinsic12 = Intrinsic.Create("current_path");
            intrinsic12.AddParam("self");
            intrinsic12.code = ((TAC.Context context, Intrinsic.Result partialResult) =>
                new Intrinsic.Result(RuntimeContext.CurrentPath));
            
            Intrinsic intrinsic13 = Intrinsic.Create("launch_path");
            intrinsic13.AddParam("self");
            intrinsic13.code = ((TAC.Context context, Intrinsic.Result partialResult) =>
                new Intrinsic.Result(RuntimeContext.CurrentPath));

            Intrinsic intrinsic14 = Intrinsic.Create("include_lib");
            intrinsic14.AddParam("libPath");
            intrinsic14.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                return new Intrinsic.Result(intrinsic14.name + " isn't implemented");
            };

            Intrinsic.Create("user_mail_address").code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            { 
                return new Intrinsic.Result(RuntimeContext.EmailAddress);
            };

            Intrinsic.Create("user_bank_number").code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                return new Intrinsic.Result(RuntimeContext.BankNumber);
            };

            Intrinsic.Create("program_path").code = ((TAC.Context context, Intrinsic.Result partialResult) => new Intrinsic.Result(RuntimeContext.CurrentPath));
            
            Intrinsic intrinsic15 = Intrinsic.Create("format_columns");
            intrinsic15.AddParam("output_str");
            intrinsic15.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                ValString valString = context.GetVar("output_str") as ValString;
                if (valString == null || string.IsNullOrEmpty(valString.value))
                {
                    return new Intrinsic.Result("");
                }
                return new Intrinsic.Result(TerminalTools.FormatColumnas(valString.value, 2));
            };

            Intrinsic intrinsic16 = Intrinsic.Create("is_lan_ip");
            intrinsic16.AddParam("address");
            intrinsic16.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                ValString valString = context.GetVar("address") as ValString;
                if (valString == null || string.IsNullOrEmpty(valString.value))
                {
                    return Intrinsic.Result.False;
                }
                string value = valString.value;
                if (!IP.IsValidIP(value, false))
                {
                    return Intrinsic.Result.False;
                }
                if (!new IP(value).IsLanIp())
                {
                    return Intrinsic.Result.False;
                }
                return Intrinsic.Result.True;
            };

            Intrinsic intrinsic17 = Intrinsic.Create("parent_path");
            intrinsic17.AddParam("path");
            intrinsic17.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                ValString valString = context.GetVar("path") as ValString;
                if (valString == null || string.IsNullOrEmpty(valString.value))
                {
                    throw new RuntimeException("parent_path: Invalid arguments");
                }
                string value = valString.value;
                return new Intrinsic.Result(string.IsNullOrEmpty(value) ? "" : Path.GetPathRoot(RuntimeContext.CurrentPath));
            };

            Intrinsic intrinsic18 = Intrinsic.Create("is_valid_ip");
            intrinsic18.AddParam("ipAddress");
            intrinsic18.code = delegate (TAC.Context context, Intrinsic.Result partialResult)
            {
                ValString valString = context.GetVar("ipAddress") as ValString;
                if (valString == null || string.IsNullOrEmpty(valString.value))
                {
                    return Intrinsic.Result.False;
                }
                if (!IP.IsValidIP(valString.value, false))
                {
                    return Intrinsic.Result.False;
                }
                return Intrinsic.Result.True;
            };
        }

    }
    public class DebugVariable
    {
        public string Name { get; set; }
        public string? Value { get; set; }
    }
}
