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

        private void _cbOptimize_CheckedChanged(object sender, EventArgs e)
        {
            _grpOptimization.Enabled = _cbOptimize.Checked;
        }

        private void _btnCompile_Click(object sender, EventArgs e)
        {
            GreyHackCompiler.Settings settings = GreyHackCompiler.Settings.None;
            if (_cbIgnoreMapIndexes.Checked) settings |= GreyHackCompiler.Settings.IgnoreMapVariables;
            _rtbOutput.Text = GreyHackCompiler.Compile(_rtbInput.Text, _cbOptimize.Checked, settings);
        }
    }
}
