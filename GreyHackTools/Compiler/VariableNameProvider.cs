using System.Collections.Generic;
using System.Text;

namespace GreyHackTools
{
    class VariableNameProvider
    {
        private Dictionary<string,string> _replace = new Dictionary<string, string>();
        private HashSet<string> _names = new HashSet<string>();
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

        public string GetFree(bool optimize)
        {
            string name = "";
            bool c;
            if (optimize)
            {
                string s = Next();
                _names.Add(s);
                return s;
            }
            do
            {
                name = Next();
            } while (_names.Contains(name));
            
            

            return name;
        }

        public bool IsDefined(string name)
        {
            return _replace.ContainsKey(name);
        }
        public string GetReplace(string orig)
        {
            if (!_replace.ContainsKey(orig))
            {
                string s = Next();
                _replace[orig] = s;
                return s;
            }

            return _replace[orig];
        }

        public void Define(string name)
        {
            if (!_names.Contains(name))
            {
                _names.Add(name);
            }
        }
    }
}
