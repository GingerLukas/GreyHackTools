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
using GreyHackTools;
using Miniscript;

namespace FormsCompiler
{
    public partial class FormsGreyHackCompiler : Form
    {
        public FormsGreyHackCompiler()
        {
            InitializeComponent();
            _dgvVariables.DataSource = debugVariables;
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

        private void _cbOptimize_CheckedChanged(object sender, EventArgs e)
        {
            _grpOptimization.Enabled = _cbOptimize.Checked;

            Compile();
        }

        private void _btnCompile_Click(object sender, EventArgs e)
        {
            Compile();
        }

        private void _rtbInput_TextChanged(object sender, EventArgs e)
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

        private int line = 0;
        private string[] codeLines;
        BindingList<DebugVariable> debugVariables = new BindingList<DebugVariable>();
        private EventWaitHandle debugWaitHandle = new EventWaitHandle(false,EventResetMode.AutoReset);
        Task debugerTask = Task.CompletedTask;
        private void _btnDebugRun_Click(object sender, EventArgs e)
        {
            if(!debugerTask.IsCompleted) return;
            codeLines = _rtbOutput.Text.Split(new[] {"\n", "\r\n"}, StringSplitOptions.None);
            Interpreter interpreter = new Interpreter(_rtbOutput.Text);
            debugVariables.Clear();
            debugerTask = Task.Run(() =>
            {
                interpreter.RunUntilDone(Double.MaxValue, true, m =>
                {
                    TAC.Context context = m.stack.Peek();
                    if (context.code[context.lineNum].location == null)
                    {
                        _rtbOutput.Invoke((MethodInvoker) (() =>
                        {
                            _rtbOutput.ResetHighlight();
                        }));
                        debugWaitHandle.Set();
                        return;
                    }

                    if (context.lineNum >= context.code.Count || context.code[context.lineNum].location.lineNum == line)
                    {
                        debugWaitHandle.Set();
                        return;
                    }

                    line = context.code[context.lineNum].location.lineNum;
                    _rtbOutput.Invoke((MethodInvoker) (() =>
                    {
                        _rtbOutput.HighlightLine(line - 1, Color.Brown);
                    }));
                    _dgvVariables.Invoke((MethodInvoker) (() =>
                    {
                        debugVariables.Clear();
                        if (context.variables == null) return;
                        foreach (Value key in context.variables.Keys)
                        {
                            debugVariables.Add(new DebugVariable()
                                {Name = key.ToString(), Value = context.variables[key.ToString()].ToString()});
                        }
                    }));
                    //MessageBox.Show(codeLines[context.code[context.lineNum].location.lineNum-1]);
                }, debugWaitHandle);
            });
        }

        private void _btnDebugStep_Click(object sender, EventArgs e)
        {
            debugWaitHandle.Set();
        }

    }

    class DebugVariable
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
    public static class FormsExtension
    {
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
