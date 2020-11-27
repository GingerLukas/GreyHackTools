using System;
using System.IO;
using GreyHackTools;

namespace ConsoleCompiler
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(GreyHackCompiler.Compile(File.ReadAllText("test.src"),true));
            Console.ReadKey();
        }
    }
}
