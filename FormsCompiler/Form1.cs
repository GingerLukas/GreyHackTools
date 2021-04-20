using System;
using System.Collections.Generic;
using System.Drawing;
using System.Net;
using System.Text.Json.Serialization;
using System.Windows.Forms;
using FastColoredTextBoxNS;
using GreyHackTools;
using Miniscript;

namespace FormsCompiler
{
    public partial class FormsGreyHackCompiler : Form
    {
        private GreyHackDebugger _debugger;
        private TabPage _prevPage;

        private WebClient _webClient = new WebClient();

        public FormsGreyHackCompiler()
        {
            _debugger = new GreyHackDebugger();
            _debugger.AutomaticallyClearDebugVariables = false;
            
            InitializeComponent();
            
            _dgvVariables.DataSource = _debugger.DebugVariables;

            SetupInterpreter();

            _rtbOutput.BookmarkColor = Color.Brown;

            SetupDemoUi();

            SetupEvents();
        }

        #region Setup

        private void SetupInterpreter()
        {
            _debugger.Interpreter.standardOutput = s => _rtbScriptOutput.Invoke(() =>
            {
                _rtbScriptOutput.AppendText(s + '\n');
                _rtbScriptOutput.ScrollToCaret();
            });
            _debugger.Interpreter.errorOutput = _debugger.Interpreter.standardOutput;
            _debugger.Interpreter.implicitOutput = _debugger.Interpreter.standardOutput;
        }

        private void SetupDemoUi()
        {
            this._rtbInput.Text = @"for (i in range(0,10)){ print(i) }
//
//
add = (a,b) => { return a + b }
//
//
sub = (a,b) => {
    return a - b
}
//
//
mul = function(a,b){
    return(a*b)
}
//
//
while (true) {}
//
if (true) {}";

            splitContainer3.SplitterDistance = splitContainer3.Size.Width / 2;
        }

        private void SetupEvents()
        {
            _btnDebuggerRun.Click += BtnDebuggerRunOnClick;
            _btnDebuggerStep.Click += BtnDebuggerStepOnClick;
            _btnDebuggerStop.Click += BtnDebuggerStopOnClick;

            _debugger.Started += OnDebuggerStarted;
            _debugger.Ended += OnDebuggerEnded;
            _debugger.Step += OnDebuggerStep;
            
            GreyHackCompiler.Include += GreyHackCompilerInclude;
        }

        private async void GreyHackCompilerInclude(string include,string dir, Ref<int> counter, Dictionary<string, string> includetocode,Dictionary<string,string> includeToFullPath)
        {
            try
            {
                includetocode[include] = _webClient.DownloadString("https://raw.githubusercontent.com/" + include);
            }
            catch (Exception e)
            {
                
            }
            counter.Value--;
        }

        #endregion


        private async void Compile()
        {
            GreyHackCompiler.Settings settings = GreyHackCompiler.Settings.None;
            if (_cbIgnoreMapIndexes.Checked) settings |= GreyHackCompiler.Settings.IgnoreMapVariables;
            if (_cbRemoveComments.Checked) settings |= GreyHackCompiler.Settings.RemoveComments;
            Ref<string> compiledCode = new Ref<string>("");
            if (GreyHackCompiler.TryCompile(_rtbInput.Text, compiledCode, _cbOptimize.Checked, settings))
            {
                _rtbOutput.Text = compiledCode.Value;
            }
        }


        #region Debugger

        #region UI

        private void BtnDebuggerStepOnClick(object? sender, EventArgs e)
        {
            _debugger.NextStep();
        }

        private void BtnDebuggerRunOnClick(object? sender, EventArgs e)
        {
            if (_debugger.Running)
            {
                _debugger.Continue();
            }
            else
            {
                _debugger.Start();
            }
        }
        private void BtnDebuggerStopOnClick(object? sender, EventArgs e)
        {
            _debugger.Stop();
        }

        #endregion

        #region Events

        private void OnDebuggerStarted(GreyHackDebugger debugger)
        {
            Compile();
            _rtbInput.ReadOnly = true;

            debugger.Code = (_rtbOutput.Text);
            debugger.DebugVariables.Clear();
            
            _status.BackColor = Color.FromArgb(202, 81, 0);
            _prevPage = _tcRight.SelectedTab;
            _tcRight.SelectTab(_tpDebug);

            _btnDebuggerRun.Text = "Continue";
        }

        private void OnDebuggerEnded(GreyHackDebugger debugger)
        {
            _dgvVariables.Invoke(() => debugger.DebugVariables.Clear());

            _rtbOutput.Invoke(UpdateBreakPoints);
            _status.Invoke(() => _status.BackColor = Color.FromArgb(0, 122, 204));
            _tcRight.Invoke(() => _tcRight.SelectTab(_prevPage));
            _rtbInput.ReadOnly = false;

            _btnDebuggerRun.Text = "Run";
        }

        private void OnDebuggerStep(GreyHackDebugger debugger,TAC.Context context, int lastLine, int currentLine)
        {
            //line highlight
            _rtbOutput.Invoke(() =>
            {
                _rtbOutput.HighlightLine(lastLine - 1, null);
                UpdateBreakPoints();
                _rtbOutput.HighlightLine(currentLine - 1, Color.Brown);
                _rtbOutput.Invalidate();
            });

            //variables update
            _dgvVariables.Invoke(() =>
            {
                debugger.DebugVariables.Clear();
                if (context.variables == null) return;
                foreach (Value key in context.variables.Keys)
                {
                    string s = context.variables[key.ToString()] == null
                        ? "null"
                        : context.variables[key.ToString()].ToString();
                    debugger.DebugVariables.Add(new DebugVariable()
                        {Name = key.ToString(), Value = s});
                }
            });
        }

        #endregion

        #endregion

        #region Breakpoints

        private void UpdateBreakPoints()
        {
            _rtbOutput.Bookmarks.Clear();
            _rtbOutput.ResetHighlight();
            foreach (int line in _debugger.BreakpointLines)
            {
                _rtbOutput.BookmarkLine(line - 1);
                _rtbOutput.HighlightLine(line - 1, Color.FromArgb(100, Color.Brown));
            }
        }

        private void _rtbOutput_LineClicked(object sender, LineClickedEventArgs e)
        {
            int line = e.Line + 1;
            if (_debugger.BreakpointLines.Contains(line))
            {
                _debugger.BreakpointLines.Remove(line);
            }
            else
            {
                _debugger.BreakpointLines.Add(line);
            }
            UpdateBreakPoints();
        }

        #endregion

        #region Resize

        private void splitContainer2_Panel2_Resize(object sender, EventArgs e)
        {
            _tcBottom.ResizeToFit(splitContainer2.Panel2);
        }

        private void _tpOutput_Resize(object sender, EventArgs e)
        {
            _rtbScriptOutput.ResizeToFit(_tpOutput);
            _rtbScriptOutput.ScrollToCaret();
        }

        private void splitContainer1_Panel1_Resize(object sender, EventArgs e)
        {
            splitContainer2.ResizeToFit(splitContainer1.Panel1);
        }

        private void FormsGreyHackCompiler_Resize(object sender, EventArgs e)
        {
            //why 10? no idea.
            splitContainer1.Size = new Size(
                Size.Width - (splitContainer1.Margin.Left + splitContainer1.Margin.Right+10),
                Size.Height - 92);
        }

        private void splitContainer2_Panel1_Resize(object sender, EventArgs e)
        {
            splitContainer3.ResizeToFit(splitContainer2.Panel1);
        }

        private void splitContainer3_Panel2_Resize(object sender, EventArgs e)
        {
            _rtbOutput.ResizeToFit(splitContainer3.Panel2,3);
        }

        private void splitContainer3_Panel1_Resize(object sender, EventArgs e)
        {
            _rtbInput.ResizeToFit(splitContainer3.Panel1,3);
        }

        #endregion

        #region StateChanged

        private void _rtbOutput_TextChanged(object sender, TextChangedEventArgs e)
        {
            UpdateBreakPoints();
        }

        private void _cbOptimize_CheckedChanged(object sender, EventArgs e)
        {
            _grpOptimization.Enabled = _cbOptimize.Checked;

            Compile();
        }

        private void _cbIgnoreMapIndexes_CheckedChanged(object sender, EventArgs e)
        {
            Compile();
        }

        private void _cbRemoveComments_CheckedChanged(object sender, EventArgs e)
        {
            Compile();
        }

        private void _rtbInput_TextChanged(object sender, FastColoredTextBoxNS.TextChangedEventArgs e)
        {
            Compile();
        }

        #endregion

        private void splitContainer1_Panel2_Resize(object sender, EventArgs e)
        {
            _tcRight.ResizeToFit(splitContainer1.Panel2);
            //_tcRight.Size = new Size(splitContainer1.Panel2.Size.Width - 18, splitContainer1.Panel2.Size.Height - 6);
        }
    }

    public static class FormsExtension
    {
        public static void Invoke(this Control control, Action action)
        {
            control.Invoke(action);
        }

        public static void ResizeToFit(this Control control, Control parent,int xOffset = 0, int yOffset = 0)
        {
            control.Size = new Size(
                (parent.Size.Width - (control.Margin.Left + control.Margin.Right + control.Location.X - 1)) + xOffset,
                (parent.Size.Height - (control.Margin.Top + control.Margin.Bottom + control.Location.Y - 1)) + yOffset);
        }
    }

    
}
