using System;
using System.Diagnostics;
using System.IO;
using GreyHackTools;

namespace ConsoleCompiler
{
    class Program
    {
        static void Main(string[] args)
        {
            string s = File.ReadAllText("test.src");
            int len = s.Length;
            Stopwatch sw = Stopwatch.StartNew();
            s = GreyHackCompiler.Compile(s, false);
            sw.Stop();
            Console.WriteLine(s);
            Console.WriteLine(sw.Elapsed);
            Console.WriteLine(len);
            Console.WriteLine(s.Length);
            Console.WriteLine(len-s.Length);
            Console.ReadKey();
        }
    }
}
