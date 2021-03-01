using System;
using GreyHackTools.Debugger.GreyHackEmulation;
using Miniscript;

namespace GreyHackTools
{
    public class RuntimeContext
    {
        public string ParamsString
        {
            get => string.Join(' ', Params);
            set => Params = value.Split(' ');
        }
        public string[] Params { get; set; }
        public string ActiveUser { get; set; } = "Ginger";
        public string PublicIP { get; set; }
        public string LocalIP { get; set; }
        public string RouterLocalIP { get; set; }
        public string CurrentPath { get; set; } = "/bin";
        public string EmailAddress { get; set; } = "name@server.org";
        public string BankNumber { get; set; }

        internal Random random = new Random(DateTime.Now.TimeOfDay.Milliseconds);

        public RuntimeContext()
        {
            PublicIP = IP.RandomPublicIp(random).ToString();
            LocalIP = IP.RandomLocalIp(random).ToString();
            RouterLocalIP = IP.RandomLocalIp(random).ToString();

            BankNumber = random.Next(1000000, 9999999).ToString();

            Params = new string[0];
        }
    }
}