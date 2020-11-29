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
            string initialCode = File.ReadAllText("Test.src");

            string noOptimize = GreyHackCompiler.Compile(initialCode);
            string onlyVariables =
                GreyHackCompiler.Compile(initialCode, true, GreyHackCompiler.Settings.IgnoreMapVariables);
            string fullOptimize = GreyHackCompiler.Compile(initialCode, true);
            
            Console.WriteLine($"Initial: {initialCode.Length} chars");
            Console.WriteLine($"No optimize: {noOptimize.Length} chars {GetPercentage(noOptimize.Length, initialCode.Length)}%");
            Console.WriteLine($"Optimize w/o maps: {onlyVariables.Length} chars {GetPercentage(onlyVariables.Length, initialCode.Length)}%");
            Console.WriteLine($"Full optimize: {fullOptimize.Length} chars {GetPercentage(fullOptimize.Length, initialCode.Length)}%");

            Console.WriteLine();
            
            //Console.WriteLine(noOptimize);
            Console.WriteLine(onlyVariables);
            //Console.WriteLine(fullOptimize);

            Console.ReadKey();
        }

        static double GetPercentage(double up, double down)
        {
            return (up / down) * 100;
        }
    }
}
