using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GreyHackTools
{
    class VariableNameProvider
    {
        private Dictionary<string,string> _replace = new Dictionary<string, string>();
        private int _state;
        private string _chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private string Next()
        {
            StringBuilder sb = new StringBuilder();
            int index = _state;

            do
            {
                int i = index % _chars.Length;
                char c = _chars[i];
                sb.Append(c);
                index /= _chars.Length;
            } while (index > 0);

            _state++;
            return sb.ToString();
        }

        public bool Defined(string name)
        {
            return _replace.ContainsKey(name);
        }
        public string GetReplace(string orig)
        {
            if (!_replace.ContainsKey(orig))
                _replace[orig] = Next();

            return _replace[orig];
        }
    }
}
