namespace SPA.Service.Helpers;
public static class StringHashHelper
{
    public static int GetStableHashCode(this string str)
    {
        unchecked
        {
            int hash1 = 5381;
            int hash2 = hash1;
            int strLen = str.Length;
            for (int i = 0; i < strLen; i += 2)
            {
                hash1 = ((hash1 << 5) + hash1) ^ str[i];
                if (i == strLen - 1)
                    break;
                hash2 = ((hash2 << 5) + hash2) ^ str[i + 1];
            }

            return hash1 + (hash2 * 1566083941);
        }
    }
    public static int GetStableHashCode(byte[] data)
    {
        if (data == null)
        {
            return 0;
        }
        unchecked
        {
            const int p = 16777619;
            int hash = (int)2166136261;
            var l = data.Length;
            for (int i = 0; i < l; i++)
                hash = (hash ^ data[i]) * p;

            hash += hash << 13;
            hash ^= hash >> 7;
            hash += hash << 3;
            hash ^= hash >> 17;
            hash += hash << 5;
            return hash;
        }
    }
}