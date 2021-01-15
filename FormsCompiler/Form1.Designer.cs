
using FastColoredTextBoxNS;

namespace FormsCompiler
{
    partial class FormsGreyHackCompiler
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FormsGreyHackCompiler));
            this._btnCompile = new System.Windows.Forms.Button();
            this._cbOptimize = new System.Windows.Forms.CheckBox();
            this._grpOptimization = new System.Windows.Forms.GroupBox();
            this._cbIgnoreMapIndexes = new System.Windows.Forms.CheckBox();
            this._cbRemoveComments = new System.Windows.Forms.CheckBox();
            this._btnDebugStep = new System.Windows.Forms.Button();
            this._dgvVariables = new System.Windows.Forms.DataGridView();
            this._status = new System.Windows.Forms.StatusStrip();
            this._tcBottom = new System.Windows.Forms.TabControl();
            this._tpOutput = new System.Windows.Forms.TabPage();
            this._rtbScriptOutput = new System.Windows.Forms.RichTextBox();
            this._tools = new System.Windows.Forms.ToolStrip();
            this._btnDebuggerRun = new System.Windows.Forms.ToolStripButton();
            this._rtbOutput = new FastColoredTextBoxNS.FastColoredTextBox();
            this._rtbInput = new FastColoredTextBoxNS.FastColoredTextBox();
            this.splitContainer1 = new System.Windows.Forms.SplitContainer();
            this.splitContainer2 = new System.Windows.Forms.SplitContainer();
            this.splitContainer3 = new System.Windows.Forms.SplitContainer();
            this._grpOptimization.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this._dgvVariables)).BeginInit();
            this._tcBottom.SuspendLayout();
            this._tpOutput.SuspendLayout();
            this._tools.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this._rtbOutput)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this._rtbInput)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer2)).BeginInit();
            this.splitContainer2.Panel1.SuspendLayout();
            this.splitContainer2.Panel2.SuspendLayout();
            this.splitContainer2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer3)).BeginInit();
            this.splitContainer3.Panel1.SuspendLayout();
            this.splitContainer3.Panel2.SuspendLayout();
            this.splitContainer3.SuspendLayout();
            this.SuspendLayout();
            // 
            // _btnCompile
            // 
            this._btnCompile.BackColor = System.Drawing.Color.Transparent;
            this._btnCompile.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this._btnCompile.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this._btnCompile.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this._btnCompile.ForeColor = System.Drawing.Color.Transparent;
            this._btnCompile.Location = new System.Drawing.Point(15, 418);
            this._btnCompile.Name = "_btnCompile";
            this._btnCompile.Size = new System.Drawing.Size(151, 23);
            this._btnCompile.TabIndex = 1;
            this._btnCompile.Text = "Compile";
            this._btnCompile.UseVisualStyleBackColor = false;
            this._btnCompile.Click += new System.EventHandler(this._btnCompile_Click);
            // 
            // _cbOptimize
            // 
            this._cbOptimize.AutoSize = true;
            this._cbOptimize.Location = new System.Drawing.Point(15, 368);
            this._cbOptimize.Name = "_cbOptimize";
            this._cbOptimize.Size = new System.Drawing.Size(123, 19);
            this._cbOptimize.TabIndex = 4;
            this._cbOptimize.Text = "Optimize variables";
            this._cbOptimize.UseVisualStyleBackColor = true;
            this._cbOptimize.CheckedChanged += new System.EventHandler(this._cbOptimize_CheckedChanged);
            // 
            // _grpOptimization
            // 
            this._grpOptimization.BackColor = System.Drawing.Color.Transparent;
            this._grpOptimization.Controls.Add(this._cbIgnoreMapIndexes);
            this._grpOptimization.Enabled = false;
            this._grpOptimization.ForeColor = System.Drawing.SystemColors.Control;
            this._grpOptimization.Location = new System.Drawing.Point(14, 262);
            this._grpOptimization.Name = "_grpOptimization";
            this._grpOptimization.Size = new System.Drawing.Size(152, 100);
            this._grpOptimization.TabIndex = 6;
            this._grpOptimization.TabStop = false;
            this._grpOptimization.Text = "Optimization settings";
            // 
            // _cbIgnoreMapIndexes
            // 
            this._cbIgnoreMapIndexes.AutoSize = true;
            this._cbIgnoreMapIndexes.Location = new System.Drawing.Point(6, 22);
            this._cbIgnoreMapIndexes.Name = "_cbIgnoreMapIndexes";
            this._cbIgnoreMapIndexes.Size = new System.Drawing.Size(130, 19);
            this._cbIgnoreMapIndexes.TabIndex = 5;
            this._cbIgnoreMapIndexes.Text = "Ignore map indexes";
            this._cbIgnoreMapIndexes.UseVisualStyleBackColor = true;
            this._cbIgnoreMapIndexes.CheckedChanged += new System.EventHandler(this._cbIgnoreMapIndexes_CheckedChanged);
            // 
            // _cbRemoveComments
            // 
            this._cbRemoveComments.AutoSize = true;
            this._cbRemoveComments.Location = new System.Drawing.Point(15, 393);
            this._cbRemoveComments.Name = "_cbRemoveComments";
            this._cbRemoveComments.Size = new System.Drawing.Size(129, 19);
            this._cbRemoveComments.TabIndex = 7;
            this._cbRemoveComments.Text = "Remove comments";
            this._cbRemoveComments.UseVisualStyleBackColor = true;
            this._cbRemoveComments.CheckedChanged += new System.EventHandler(this._cbRemoveComments_CheckedChanged);
            // 
            // _btnDebugStep
            // 
            this._btnDebugStep.BackColor = System.Drawing.Color.Transparent;
            this._btnDebugStep.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this._btnDebugStep.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this._btnDebugStep.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this._btnDebugStep.ForeColor = System.Drawing.Color.Transparent;
            this._btnDebugStep.Location = new System.Drawing.Point(115, 218);
            this._btnDebugStep.Name = "_btnDebugStep";
            this._btnDebugStep.Size = new System.Drawing.Size(51, 23);
            this._btnDebugStep.TabIndex = 8;
            this._btnDebugStep.Text = "Step";
            this._btnDebugStep.UseVisualStyleBackColor = false;
            this._btnDebugStep.Click += new System.EventHandler(this._btnDebugStep_Click);
            // 
            // _dgvVariables
            // 
            this._dgvVariables.AllowUserToAddRows = false;
            this._dgvVariables.AllowUserToDeleteRows = false;
            this._dgvVariables.AllowUserToResizeColumns = false;
            this._dgvVariables.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this._dgvVariables.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(37)))), ((int)(((byte)(37)))));
            this._dgvVariables.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this._dgvVariables.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(37)))), ((int)(((byte)(37)))));
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            dataGridViewCellStyle1.ForeColor = System.Drawing.SystemColors.Control;
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(69)))), ((int)(((byte)(69)))), ((int)(((byte)(69)))));
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.SystemColors.Control;
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this._dgvVariables.DefaultCellStyle = dataGridViewCellStyle1;
            this._dgvVariables.Location = new System.Drawing.Point(3, 6);
            this._dgvVariables.Name = "_dgvVariables";
            this._dgvVariables.RowHeadersVisible = false;
            this._dgvVariables.RowTemplate.Height = 25;
            this._dgvVariables.Size = new System.Drawing.Size(185, 180);
            this._dgvVariables.TabIndex = 10;
            // 
            // _status
            // 
            this._status.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(122)))), ((int)(((byte)(204)))));
            this._status.Location = new System.Drawing.Point(0, 549);
            this._status.Name = "_status";
            this._status.RenderMode = System.Windows.Forms.ToolStripRenderMode.Professional;
            this._status.Size = new System.Drawing.Size(835, 22);
            this._status.TabIndex = 11;
            this._status.Text = "statusStrip1";
            // 
            // _tcBottom
            // 
            this._tcBottom.Alignment = System.Windows.Forms.TabAlignment.Bottom;
            this._tcBottom.Controls.Add(this._tpOutput);
            this._tcBottom.Location = new System.Drawing.Point(3, 3);
            this._tcBottom.Name = "_tcBottom";
            this._tcBottom.SelectedIndex = 0;
            this._tcBottom.Size = new System.Drawing.Size(584, 94);
            this._tcBottom.TabIndex = 12;
            // 
            // _tpOutput
            // 
            this._tpOutput.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(37)))), ((int)(((byte)(37)))));
            this._tpOutput.Controls.Add(this._rtbScriptOutput);
            this._tpOutput.ForeColor = System.Drawing.SystemColors.Control;
            this._tpOutput.Location = new System.Drawing.Point(4, 4);
            this._tpOutput.Name = "_tpOutput";
            this._tpOutput.Padding = new System.Windows.Forms.Padding(3);
            this._tpOutput.Size = new System.Drawing.Size(576, 66);
            this._tpOutput.TabIndex = 0;
            this._tpOutput.Text = "Output";
            this._tpOutput.Resize += new System.EventHandler(this._tpOutput_Resize);
            // 
            // _rtbScriptOutput
            // 
            this._rtbScriptOutput.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(37)))), ((int)(((byte)(37)))));
            this._rtbScriptOutput.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this._rtbScriptOutput.ForeColor = System.Drawing.SystemColors.Control;
            this._rtbScriptOutput.Location = new System.Drawing.Point(3, 3);
            this._rtbScriptOutput.Name = "_rtbScriptOutput";
            this._rtbScriptOutput.ReadOnly = true;
            this._rtbScriptOutput.Size = new System.Drawing.Size(570, 60);
            this._rtbScriptOutput.TabIndex = 0;
            this._rtbScriptOutput.Text = "";
            // 
            // _tools
            // 
            this._tools.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(28)))), ((int)(((byte)(28)))), ((int)(((byte)(28)))));
            this._tools.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this._btnDebuggerRun});
            this._tools.Location = new System.Drawing.Point(0, 0);
            this._tools.Name = "_tools";
            this._tools.RenderMode = System.Windows.Forms.ToolStripRenderMode.System;
            this._tools.Size = new System.Drawing.Size(835, 25);
            this._tools.TabIndex = 14;
            this._tools.Text = "toolStrip1";
            this._tools.ItemClicked += new System.Windows.Forms.ToolStripItemClickedEventHandler(this._tools_ItemClicked);
            // 
            // _btnDebuggerRun
            // 
            this._btnDebuggerRun.Image = ((System.Drawing.Image)(resources.GetObject("_btnDebuggerRun.Image")));
            this._btnDebuggerRun.ImageTransparentColor = System.Drawing.Color.Magenta;
            this._btnDebuggerRun.Name = "_btnDebuggerRun";
            this._btnDebuggerRun.Size = new System.Drawing.Size(48, 22);
            this._btnDebuggerRun.Text = "Run";
            // 
            // _rtbOutput
            // 
            this._rtbOutput.AutoCompleteBracketsList = new char[] {
        '(',
        ')',
        '{',
        '}',
        '[',
        ']',
        '\"',
        '\"',
        '\'',
        '\''};
            this._rtbOutput.AutoIndentCharsPatterns = "^\\s*[\\w\\.]+(\\s\\w+)?\\s*(?<range>=)\\s*(?<range>[^;=]+);\n^\\s*(case|default)\\s*[^:]*(" +
    "?<range>:)\\s*(?<range>[^;]+);";
            this._rtbOutput.AutoScrollMinSize = new System.Drawing.Size(27, 14);
            this._rtbOutput.BackBrush = null;
            this._rtbOutput.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(38)))), ((int)(((byte)(38)))), ((int)(((byte)(38)))));
            this._rtbOutput.CharHeight = 14;
            this._rtbOutput.CharWidth = 8;
            this._rtbOutput.Cursor = System.Windows.Forms.Cursors.IBeam;
            this._rtbOutput.DisabledColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(180)))), ((int)(((byte)(180)))), ((int)(((byte)(180)))));
            this._rtbOutput.IndentBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(38)))), ((int)(((byte)(38)))), ((int)(((byte)(38)))));
            this._rtbOutput.IsReplaceMode = false;
            this._rtbOutput.Location = new System.Drawing.Point(3, 3);
            this._rtbOutput.Name = "_rtbOutput";
            this._rtbOutput.Paddings = new System.Windows.Forms.Padding(0);
            this._rtbOutput.ReadOnly = true;
            this._rtbOutput.SelectionColor = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(255)))));
            this._rtbOutput.ServiceColors = ((FastColoredTextBoxNS.ServiceColors)(resources.GetObject("_rtbOutput.ServiceColors")));
            this._rtbOutput.Size = new System.Drawing.Size(398, 391);
            this._rtbOutput.TabIndex = 17;
            this._rtbOutput.Zoom = 100;
            this._rtbOutput.TextChanged += new System.EventHandler<FastColoredTextBoxNS.TextChangedEventArgs>(this._rtbOutput_TextChanged);
            this._rtbOutput.LineClicked += new System.EventHandler<FastColoredTextBoxNS.LineClickedEventArgs>(this._rtbOutput_LineClicked);
            // 
            // _rtbInput
            // 
            this._rtbInput.AutoCompleteBracketsList = new char[] {
        '(',
        ')',
        '{',
        '}',
        '[',
        ']',
        '\"',
        '\"',
        '\'',
        '\''};
            this._rtbInput.AutoIndentCharsPatterns = "^\\s*[\\w\\.]+(\\s\\w+)?\\s*(?<range>=)\\s*(?<range>[^;=]+);\n^\\s*(case|default)\\s*[^:]*(" +
    "?<range>:)\\s*(?<range>[^;]+);";
            this._rtbInput.AutoScrollMinSize = new System.Drawing.Size(27, 14);
            this._rtbInput.BackBrush = null;
            this._rtbInput.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(38)))), ((int)(((byte)(38)))), ((int)(((byte)(38)))));
            this._rtbInput.CharHeight = 14;
            this._rtbInput.CharWidth = 8;
            this._rtbInput.Cursor = System.Windows.Forms.Cursors.IBeam;
            this._rtbInput.DisabledColor = System.Drawing.Color.FromArgb(((int)(((byte)(100)))), ((int)(((byte)(180)))), ((int)(((byte)(180)))), ((int)(((byte)(180)))));
            this._rtbInput.IndentBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(38)))), ((int)(((byte)(38)))), ((int)(((byte)(38)))));
            this._rtbInput.IsReplaceMode = false;
            this._rtbInput.Location = new System.Drawing.Point(3, 3);
            this._rtbInput.Name = "_rtbInput";
            this._rtbInput.Paddings = new System.Windows.Forms.Padding(0);
            this._rtbInput.SelectionColor = System.Drawing.Color.FromArgb(((int)(((byte)(60)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(255)))));
            this._rtbInput.ServiceColors = ((FastColoredTextBoxNS.ServiceColors)(resources.GetObject("_rtbInput.ServiceColors")));
            this._rtbInput.Size = new System.Drawing.Size(170, 391);
            this._rtbInput.TabIndex = 18;
            this._rtbInput.Zoom = 100;
            this._rtbInput.TextChanged += new System.EventHandler<FastColoredTextBoxNS.TextChangedEventArgs>(this._rtbInput_TextChanged);
            // 
            // splitContainer1
            // 
            this.splitContainer1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.splitContainer1.Location = new System.Drawing.Point(0, 28);
            this.splitContainer1.Name = "splitContainer1";
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.Controls.Add(this.splitContainer2);
            this.splitContainer1.Panel1.Resize += new System.EventHandler(this.splitContainer1_Panel1_Resize);
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this._dgvVariables);
            this.splitContainer1.Panel2.Controls.Add(this._grpOptimization);
            this.splitContainer1.Panel2.Controls.Add(this._btnCompile);
            this.splitContainer1.Panel2.Controls.Add(this._cbOptimize);
            this.splitContainer1.Panel2.Controls.Add(this._btnDebugStep);
            this.splitContainer1.Panel2.Controls.Add(this._cbRemoveComments);
            this.splitContainer1.Size = new System.Drawing.Size(832, 518);
            this.splitContainer1.SplitterDistance = 627;
            this.splitContainer1.TabIndex = 19;
            // 
            // splitContainer2
            // 
            this.splitContainer2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.splitContainer2.Location = new System.Drawing.Point(3, 3);
            this.splitContainer2.Name = "splitContainer2";
            this.splitContainer2.Orientation = System.Windows.Forms.Orientation.Horizontal;
            // 
            // splitContainer2.Panel1
            // 
            this.splitContainer2.Panel1.Controls.Add(this.splitContainer3);
            this.splitContainer2.Panel1.Resize += new System.EventHandler(this.splitContainer2_Panel1_Resize);
            // 
            // splitContainer2.Panel2
            // 
            this.splitContainer2.Panel2.Controls.Add(this._tcBottom);
            this.splitContainer2.Panel2.Resize += new System.EventHandler(this.splitContainer2_Panel2_Resize);
            this.splitContainer2.Size = new System.Drawing.Size(619, 510);
            this.splitContainer2.SplitterDistance = 404;
            this.splitContainer2.TabIndex = 19;
            // 
            // splitContainer3
            // 
            this.splitContainer3.Location = new System.Drawing.Point(3, 2);
            this.splitContainer3.Name = "splitContainer3";
            // 
            // splitContainer3.Panel1
            // 
            this.splitContainer3.Panel1.Controls.Add(this._rtbInput);
            this.splitContainer3.Panel1.Resize += new System.EventHandler(this.splitContainer3_Panel1_Resize);
            // 
            // splitContainer3.Panel2
            // 
            this.splitContainer3.Panel2.Controls.Add(this._rtbOutput);
            this.splitContainer3.Panel2.Resize += new System.EventHandler(this.splitContainer3_Panel2_Resize);
            this.splitContainer3.Size = new System.Drawing.Size(611, 397);
            this.splitContainer3.SplitterDistance = 203;
            this.splitContainer3.TabIndex = 19;
            // 
            // FormsGreyHackCompiler
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(28)))), ((int)(((byte)(28)))), ((int)(((byte)(28)))));
            this.ClientSize = new System.Drawing.Size(835, 571);
            this.Controls.Add(this.splitContainer1);
            this.Controls.Add(this._tools);
            this.Controls.Add(this._status);
            this.ForeColor = System.Drawing.SystemColors.Control;
            this.Name = "FormsGreyHackCompiler";
            this.Text = "Ginger\'s G++ compiler";
            this.Resize += new System.EventHandler(this.FormsGreyHackCompiler_Resize);
            this._grpOptimization.ResumeLayout(false);
            this._grpOptimization.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this._dgvVariables)).EndInit();
            this._tcBottom.ResumeLayout(false);
            this._tpOutput.ResumeLayout(false);
            this._tools.ResumeLayout(false);
            this._tools.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this._rtbOutput)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this._rtbInput)).EndInit();
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false);
            this.splitContainer1.Panel2.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).EndInit();
            this.splitContainer1.ResumeLayout(false);
            this.splitContainer2.Panel1.ResumeLayout(false);
            this.splitContainer2.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer2)).EndInit();
            this.splitContainer2.ResumeLayout(false);
            this.splitContainer3.Panel1.ResumeLayout(false);
            this.splitContainer3.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer3)).EndInit();
            this.splitContainer3.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Button _btnCompile;
        private System.Windows.Forms.CheckBox _cbOptimize;
        private System.Windows.Forms.GroupBox _grpOptimization;
        private System.Windows.Forms.CheckBox _cbIgnoreMapIndexes;
        private System.Windows.Forms.CheckBox _cbRemoveComments;
        private System.Windows.Forms.Button _btnDebugStep;
        private System.Windows.Forms.DataGridView _dgvVariables;
        private System.Windows.Forms.StatusStrip _status;
        private System.Windows.Forms.TabControl _tcBottom;
        private System.Windows.Forms.TabPage _tpOutput;
        private System.Windows.Forms.RichTextBox _rtbScriptOutput;
        private System.Windows.Forms.ToolStrip _tools;
        private System.Windows.Forms.ToolStripButton _btnDebuggerRun;
        private FastColoredTextBoxNS.FastColoredTextBox _rtbOutput;
        private FastColoredTextBoxNS.FastColoredTextBox _rtbInput;
        private System.Windows.Forms.SplitContainer splitContainer1;
        private System.Windows.Forms.SplitContainer splitContainer2;
        private System.Windows.Forms.SplitContainer splitContainer3;
    }
}

