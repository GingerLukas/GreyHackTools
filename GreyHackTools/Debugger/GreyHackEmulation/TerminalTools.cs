using System.Collections.Generic;

namespace GreyHackTools.Debugger.GreyHackEmulation
{
    public static class TerminalTools
    {
        // Token: 0x06000FBA RID: 4026 RVA: 0x000542A8 File Offset: 0x000524A8
        public static string FormatColumnas(string salida, int separacion = 2)
        {
            string[] array = salida.Replace("\\n", "\n").Split(new char[]
            {
                '\n'
            });
            List<List<string>> list = new List<List<string>>();
            List<int> list2 = new List<int>();
            for (int i = 0; i < array.Length; i++)
            {
                string[] array2 = array[i].Split(new char[]
                {
                    ' '
                });
                list.Add(new List<string>());
                for (int j = 0; j < array2.Length; j++)
                {
                    if (array2.Length > list2.Count)
                    {
                        list2.Add(j);
                    }
                    string text = array2[j];
                    if (array2[j].Length > list2[j])
                    {
                        list2[j] = array2[j].Length;
                    }
                    list[i].Add(text.Trim());
                }
            }
            string text2 = "";
            for (int k = 0; k < list.Count; k++)
            {
                for (int l = 0; l < list[k].Count; l++)
                {
                    text2 += list[k][l];
                    int num = list2[l] - list[k][l].Length + separacion;
                    for (int m = 0; m < num; m++)
                    {
                        text2 += "\u00a0";
                    }
                }
                if (k < list.Count - 1)
                {
                    text2 += "\n";
                }
            }
            return text2;
        }
    }
}
