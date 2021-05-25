using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using GreyHackTools;

namespace ConsoleCompiler
{
    class Program
    {
        static void Main(string[] args)
        {
            if (!Directory.Exists("tests"))
            {
                Console.WriteLine(@"""tests"" folder not found");
                return;
            }

            GreyHackCompiler.Include += (include, dir, counter, code, path) =>
            {
                string p = Path.GetFullPath(Path.Join(dir, include));
                code[include] = File.ReadAllText(p);
                path[include] = p;
                counter.Value--;
            };
            
            Dictionary<string, string[]> hashes = new Dictionary<string, string[]>();
            string[] tests = Directory.GetFiles("tests");
            foreach (string test in tests)
            {
                string code = File.ReadAllText(test);
                hashes[test] = new string[8];
                for (int i = 0; i < 8; i++)
                {
                    hashes[test][i] =
                        string.Join("", MD5.HashData(Encoding.UTF8.GetBytes(GreyHackCompiler.Compile(
                            code,
                            i < 4,
                             (i % 4)))).Select(x => x.ToString("x2")));
                }
            }

            StringBuilder sb = new StringBuilder();
            foreach (var hash in hashes)
            {
                sb.Append(hash.Key);
                sb.Append(';');
                sb.AppendJoin(';', hash.Value);
                sb.AppendLine();
            }
            return;
            string newHash = string.Join("",
                MD5.HashData(Encoding.UTF8.GetBytes(sb.ToString())).Select(x => x.ToString("x2")));
            if (File.Exists("hash.txt"))
            {
                string prevHash = File.ReadAllText("hash.txt");
                
                Debug.Assert(prevHash==newHash);
            }

            File.WriteAllText("hash.txt", newHash);
        }
    }
}
