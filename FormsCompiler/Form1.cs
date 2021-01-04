using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using FastColoredTextBoxNS;
using GreyHackTools;
using Miniscript;

namespace FormsCompiler
{
    public partial class FormsGreyHackCompiler : Form
    {
        private Interpreter _interpreter;
        public FormsGreyHackCompiler()
        {
            InitializeComponent();
            
            _dgvVariables.DataSource = _debugVariables;
            
            _interpreter = new Interpreter(_rtbOutput.Text);
            _interpreter.standardOutput = s => _rtbScriptOutput.Invoke(() =>
            {
                _rtbScriptOutput.AppendText(s + '\n');
                _rtbScriptOutput.ScrollToCaret();
            });
            _interpreter.errorOutput = _interpreter.standardOutput;
            _interpreter.implicitOutput = _interpreter.standardOutput;
        }

        private void Compile()
        {
            GreyHackCompiler.Settings settings = GreyHackCompiler.Settings.None;
            if (_cbIgnoreMapIndexes.Checked) settings |= GreyHackCompiler.Settings.IgnoreMapVariables;
            if (_cbRemoveComments.Checked) settings |= GreyHackCompiler.Settings.RemoveComments;

            if (GreyHackCompiler.TryCompile(_rtbInput.Text, out string compiledCode, _cbOptimize.Checked, settings))
            {
                _rtbOutput.Text = compiledCode;
            }
        }

        private int line = 0;
        private string[] codeLines;
        private bool debuggerActive = false;
        private HashSet<int> breakpointLines = new HashSet<int>();
        BindingList<DebugVariable> _debugVariables = new BindingList<DebugVariable>();
        private EventWaitHandle debugWaitHandle = new EventWaitHandle(false, EventResetMode.AutoReset);
        Task debugerTask = Task.CompletedTask;
        private void StartDebugger()
        {
            if (!debugerTask.IsCompleted) return;
            codeLines = _rtbOutput.Text.Split(new[] { "\n", "\r\n" }, StringSplitOptions.None);

            _interpreter.Reset(_rtbOutput.Text);

            _debugVariables.Clear();
            debugerTask = Task.Run(() =>
            {
                line = 0;
                debuggerActive = false;
                _status.Invoke(() => _status.BackColor = Color.FromArgb(202, 81, 0));
                try
                {
                    _interpreter.RunUntilDone(Double.MaxValue, true, m =>
                    {
                        TAC.Context context = m.stack.Peek();
                        if (context.code[context.lineNum].location == null)
                        {
                            //_rtbOutput.Invoke(() => _rtbOutput.ResetHighlight()); //TODO replace with fctb equivalent
                            debugWaitHandle.Set();
                            return;
                        }

                        if (context.lineNum >= context.code.Count || context.code[context.lineNum].location.lineNum == line)
                        {
                            debugWaitHandle.Set();
                            return;
                        }

                        line = context.code[context.lineNum].location.lineNum;
                        if (!(debuggerActive || breakpointLines.Contains(line)))
                        {
                            debugWaitHandle.Set();
                            return;
                        }

                        debuggerActive = true;
                        _rtbOutput.Invoke(() => _rtbOutput.Selection.Start = _rtbOutput.Selection.End = new Place(0,line-1));
                        //_rtbOutput.Invoke(() => _rtbOutput.HighlightLine(line - 1, Color.Brown)); //TODO replace with fctb equivalent
                        _dgvVariables.Invoke(() =>
                        {
                            _debugVariables.Clear();
                            if (context.variables == null) return;
                            foreach (Value key in context.variables.Keys)
                            {
                                _debugVariables.Add(new DebugVariable()
                                    { Name = key.ToString(), Value = context.variables[key.ToString()].ToString() });
                            }
                        });
                    }, debugWaitHandle);
                }
                catch (Exception e)
                {
                    MessageBox.Show(e.Message, "Runtime error");
                }

                _dgvVariables.Invoke(() => _debugVariables.Clear());
                _rtbOutput.Invoke(() => _rtbOutput.Selection.GoHome(true));
                //_rtbOutput.Invoke(() => _rtbOutput.ResetHighlight()); //TODO replace with fctb equivalent
                _status.Invoke(() => _status.BackColor = Color.FromArgb(0, 122, 204));
            });
        }


        private void _cbOptimize_CheckedChanged(object sender, EventArgs e)
        {
            _grpOptimization.Enabled = _cbOptimize.Checked;

            Compile();
        }

        private void _btnCompile_Click(object sender, EventArgs e)
        {
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

        
        private void _btnDebugStep_Click(object sender, EventArgs e)
        {
            debugWaitHandle.Set();
        }

        private void _tools_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {
            if (e.ClickedItem == _btnDebuggerRun)
            {
                StartDebugger();
            }
        }

        private void _rtbInput_TextChanged(object sender, FastColoredTextBoxNS.TextChangedEventArgs e)
        {
            Compile();
        }

        private void _rtbOutput_LineClicked(object sender, LineClickedEventArgs e)
        {
            int line = e.Line + 1;
            if (breakpointLines.Contains(line))
            {
                breakpointLines.Remove(line);
            }
            else
            {
                breakpointLines.Add(line);
            }
        }
    }

    class DebugVariable
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
    public static class FormsExtension
    {
        public static void Invoke(this Control control, Action action)
        {
            control.Invoke(action);
        }
        
        public static void HighlightLine(this RichTextBox richTextBox, int index, Color color)
        {
            richTextBox.SelectAll();
            richTextBox.SelectionBackColor = richTextBox.BackColor;
            var lines = richTextBox.Lines;
            if (index < 0 || index >= lines.Length)
                return;
            var start = richTextBox.GetFirstCharIndexFromLine(index);  // Get the 1st char index of the appended text
            var length = lines[index].Length;
            richTextBox.Select(start, length);                 // Select from there to the end
            richTextBox.SelectionBackColor = color;
        }
        public static void ResetHighlight(this RichTextBox richTextBox)
        {
            richTextBox.SelectAll();
            richTextBox.SelectionBackColor = richTextBox.BackColor;
        }
    }
}
