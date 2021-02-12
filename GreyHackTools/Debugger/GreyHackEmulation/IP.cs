using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;

namespace GreyHackTools.Debugger.GreyHackEmulation
{
	public class IP
	{
		private IP()
		{
		}
		
		public IP(IP other)
		{
			this.direccion = other.direccion;
		}
		
		public IP(string dirIp)
		{
			this.direccion = dirIp;
		}
		
		public IP(string[] dirIp)
		{
			this.direccion = string.Join(".", dirIp);
		}
		
		public IP(int[] dirIp)
		{
			this.direccion = string.Join<int>(".", dirIp);
		}
		
		public override string ToString()
		{
			return this.direccion;
		}
		
		public void SetAddress(IP otherIP)
		{
			this.direccion = otherIP.direccion;
		}
		
		public void SetAddress(string otherIP)
		{
			this.direccion = otherIP;
		}
		
		public bool Equals(IP other)
		{
			return other != null && this.direccion.Equals(other.direccion);
		}
		
		public bool IsLanIp()
		{
			return IP.IsLanIp(this.direccion);
		}

		public static readonly string[] LocalRanges = new string[]
        {
            "10.0",
            "172.16",
            "192.168"
        };
		
		public static bool IsLanIp(string address)
		{
			string[] partesIP = IP.GetPartesIP(address);
			if (partesIP.Length != 4)
			{
				return false;
			}
			string value = string.Join(".", new string[]
			{
			    partesIP[0],
			    partesIP[1]
			});
			return LocalRanges.Contains(value);
		}

		// Token: 0x06000CCB RID: 3275 RVA: 0x0004669C File Offset: 0x0004489C
		public static bool IsSameSubnet(string dirA, string dirB)
		{
			if (!IP.IsValidIP(dirB, false) || !IP.IsValidIP(dirA, false))
			{
				return false;
			}
			string text = dirA.Substring(0, dirA.LastIndexOf('.'));
			string value = dirB.Substring(0, dirB.LastIndexOf('.'));
			return text.Equals(value);
		}

		// Token: 0x06000CCC RID: 3276 RVA: 0x000466E2 File Offset: 0x000448E2
		public static bool IsSameSubnet(IP dirA, string dirB)
		{
			return IP.IsSameSubnet(dirA.ToString(), dirB);
		}

		// Token: 0x06000CCD RID: 3277 RVA: 0x000466F0 File Offset: 0x000448F0
		public string[] GetPartesIP()
		{
			return IP.GetPartesIP(this.direccion);
		}

		// Token: 0x06000CCE RID: 3278 RVA: 0x000466FD File Offset: 0x000448FD
		public static string[] GetPartesIP(string address)
		{
			return address.Split(new char[]
			{
			'.'
			});
		}

		// Token: 0x06000CCF RID: 3279 RVA: 0x00046710 File Offset: 0x00044910
		public void NextIP(int numIps = 1)
		{
			string[] partesIP = this.GetPartesIP();
			partesIP[3] = (int.Parse(partesIP[3]) + numIps).ToString();
			this.direccion = string.Join(".", partesIP);
		}

		// Token: 0x06000CD0 RID: 3280 RVA: 0x0004674C File Offset: 0x0004494C
		public void SetLastRange(int num)
		{
			string[] partesIP = this.GetPartesIP();
			partesIP[3] = num.ToString();
			this.direccion = string.Join(".", partesIP);
		}

		// Token: 0x06000CD1 RID: 3281 RVA: 0x0004677C File Offset: 0x0004497C
		public bool IsOtherHigher(string otherIp)
		{
			if (!IP.IsSameSubnet(this.direccion, otherIp))
			{
				return false;
			}
			string[] partesIP = this.GetPartesIP();
			return int.Parse(otherIp.Split(new char[]
			{
			'.'
			})[3]) > int.Parse(partesIP[3]);
		}

		// Token: 0x06000CD2 RID: 3282 RVA: 0x000467C4 File Offset: 0x000449C4
		public static bool IsValidIP(string dir, bool checkReserved = false)
		{
			if (dir == null)
			{
				return false;
			}
			string[] array = dir.Split(new char[]
			{
			'.'
			});
			if (array.Length != 4)
			{
				return false;
			}
			for (int i = 0; i < 4; i++)
			{
				int num;
				if (!int.TryParse(array[i], out num) || num < 0 || num > 255 || num.ToString().Length != array[i].Length)
				{
					return false;
				}
			}
			return true;
		}
		
		// Token: 0x06000CD4 RID: 3284 RVA: 0x000468A4 File Offset: 0x00044AA4
		public static bool IsInRange(string startIpAddr, string endIpAddr, string address)
		{
			long num = (long)BitConverter.ToInt32(IPAddress.Parse(startIpAddr).GetAddressBytes().Reverse<byte>().ToArray<byte>(), 0);
			long num2 = (long)BitConverter.ToInt32(IPAddress.Parse(endIpAddr).GetAddressBytes().Reverse<byte>().ToArray<byte>(), 0);
			long num3 = (long)BitConverter.ToInt32(IPAddress.Parse(address).GetAddressBytes().Reverse<byte>().ToArray<byte>(), 0);
			return num3 >= num && num3 <= num2;
		}

        public static IP RandomPublicIp(Random r)
        {
            int first = r.Next() % 255 + 1;
            int second = r.Next() % 255 + 1;
            if (IP.LocalRanges.Contains(first + "." + second))
            {
                first++;
            }

            return new IP($"{first}.{second}.{r.Next() % 255 + 1}.{r.Next() % 255 + 1}");
        }

        public static IP RandomLocalIp(Random r)
        {
            return new IP(LocalRanges[r.Next() % LocalRanges.Length] + $"{r.Next() % 255 + 1}.{r.Next() % 255 + 1}");
        }
		
		private string direccion = "";
	}
}
