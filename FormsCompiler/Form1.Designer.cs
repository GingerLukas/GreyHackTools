
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
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            this._rtbInput = new System.Windows.Forms.RichTextBox();
            this._btnCompile = new System.Windows.Forms.Button();
            this._rtbOutput = new System.Windows.Forms.RichTextBox();
            this._cbOptimize = new System.Windows.Forms.CheckBox();
            this._grpOptimization = new System.Windows.Forms.GroupBox();
            this._cbIgnoreMapIndexes = new System.Windows.Forms.CheckBox();
            this._cbRemoveComments = new System.Windows.Forms.CheckBox();
            this._btnDebugStep = new System.Windows.Forms.Button();
            this._btnDebugRun = new System.Windows.Forms.Button();
            this._dgvVariables = new System.Windows.Forms.DataGridView();
            this._grpOptimization.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this._dgvVariables)).BeginInit();
            this.SuspendLayout();
            // 
            // _rtbInput
            // 
            this._rtbInput.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(37)))), ((int)(((byte)(37)))));
            this._rtbInput.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this._rtbInput.ForeColor = System.Drawing.SystemColors.Control;
            this._rtbInput.Location = new System.Drawing.Point(12, 12);
            this._rtbInput.Name = "_rtbInput";
            this._rtbInput.Size = new System.Drawing.Size(323, 426);
            this._rtbInput.TabIndex = 0;
            this._rtbInput.Text = "";
            this._rtbInput.WordWrap = false;
            this._rtbInput.TextChanged += new System.EventHandler(this._rtbInput_TextChanged);
            // 
            // _btnCompile
            // 
            this._btnCompile.BackColor = System.Drawing.Color.Transparent;
            this._btnCompile.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this._btnCompile.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this._btnCompile.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this._btnCompile.ForeColor = System.Drawing.Color.Transparent;
            this._btnCompile.Location = new System.Drawing.Point(342, 414);
            this._btnCompile.Name = "_btnCompile";
            this._btnCompile.Size = new System.Drawing.Size(151, 23);
            this._btnCompile.TabIndex = 1;
            this._btnCompile.Text = "Compile";
            this._btnCompile.UseVisualStyleBackColor = false;
            this._btnCompile.Click += new System.EventHandler(this._btnCompile_Click);
            // 
            // _rtbOutput
            // 
            this._rtbOutput.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(37)))), ((int)(((byte)(37)))), ((int)(((byte)(37)))));
            this._rtbOutput.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this._rtbOutput.ForeColor = System.Drawing.SystemColors.Control;
            this._rtbOutput.Location = new System.Drawing.Point(499, 12);
            this._rtbOutput.Name = "_rtbOutput";
            this._rtbOutput.ReadOnly = true;
            this._rtbOutput.Size = new System.Drawing.Size(323, 426);
            this._rtbOutput.TabIndex = 3;
            this._rtbOutput.Text = "";
            this._rtbOutput.WordWrap = false;
            // 
            // _cbOptimize
            // 
            this._cbOptimize.AutoSize = true;
            this._cbOptimize.Location = new System.Drawing.Point(342, 364);
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
            this._grpOptimization.Location = new System.Drawing.Point(341, 258);
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
            this._cbRemoveComments.Location = new System.Drawing.Point(342, 389);
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
            this._btnDebugStep.Location = new System.Drawing.Point(442, 214);
            this._btnDebugStep.Name = "_btnDebugStep";
            this._btnDebugStep.Size = new System.Drawing.Size(51, 23);
            this._btnDebugStep.TabIndex = 8;
            this._btnDebugStep.Text = "Step";
            this._btnDebugStep.UseVisualStyleBackColor = false;
            this._btnDebugStep.Click += new System.EventHandler(this._btnDebugStep_Click);
            // 
            // _btnDebugRun
            // 
            this._btnDebugRun.BackColor = System.Drawing.Color.Transparent;
            this._btnDebugRun.FlatAppearance.MouseDownBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this._btnDebugRun.FlatAppearance.MouseOverBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this._btnDebugRun.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this._btnDebugRun.ForeColor = System.Drawing.Color.Transparent;
            this._btnDebugRun.Location = new System.Drawing.Point(347, 214);
            this._btnDebugRun.Name = "_btnDebugRun";
            this._btnDebugRun.Size = new System.Drawing.Size(89, 23);
            this._btnDebugRun.TabIndex = 9;
            this._btnDebugRun.Text = "Run";
            this._btnDebugRun.UseVisualStyleBackColor = false;
            this._btnDebugRun.Click += new System.EventHandler(this._btnDebugRun_Click);
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
            this._dgvVariables.Location = new System.Drawing.Point(347, 13);
            this._dgvVariables.Name = "_dgvVariables";
            this._dgvVariables.RowHeadersVisible = false;
            this._dgvVariables.RowTemplate.Height = 25;
            this._dgvVariables.Size = new System.Drawing.Size(146, 195);
            this._dgvVariables.TabIndex = 10;
            // 
            // FormsGreyHackCompiler
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(28)))), ((int)(((byte)(28)))), ((int)(((byte)(28)))));
            this.ClientSize = new System.Drawing.Size(834, 450);
            this.Controls.Add(this._dgvVariables);
            this.Controls.Add(this._btnDebugRun);
            this.Controls.Add(this._btnDebugStep);
            this.Controls.Add(this._cbRemoveComments);
            this.Controls.Add(this._grpOptimization);
            this.Controls.Add(this._cbOptimize);
            this.Controls.Add(this._rtbOutput);
            this.Controls.Add(this._btnCompile);
            this.Controls.Add(this._rtbInput);
            this.ForeColor = System.Drawing.SystemColors.Control;
            this.Name = "FormsGreyHackCompiler";
            this.Text = "Ginger\'s G++ compiler";
            this._grpOptimization.ResumeLayout(false);
            this._grpOptimization.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this._dgvVariables)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.RichTextBox _rtbInput;
        private System.Windows.Forms.Button _btnCompile;
        private System.Windows.Forms.RichTextBox _rtbOutput;
        private System.Windows.Forms.CheckBox _cbOptimize;
        private System.Windows.Forms.GroupBox _grpOptimization;
        private System.Windows.Forms.CheckBox _cbIgnoreMapIndexes;
        private System.Windows.Forms.CheckBox _cbRemoveComments;
        private System.Windows.Forms.Button _btnDebugStep;
        private System.Windows.Forms.Button _btnDebugRun;
        private System.Windows.Forms.DataGridView _dgvVariables;
    }
}

