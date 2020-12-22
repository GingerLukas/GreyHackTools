using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using GreyHackTools;

namespace FormsCompiler
{
    public partial class FormsGreyHackCompiler : Form
    {
        public FormsGreyHackCompiler()
        {
            InitializeComponent();
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
    }
}
