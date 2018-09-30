class MinHeap
{
private:
    int N;
    long long *tree;
    int *key;
    int *pos;
    int heapsize;

    // left child
    int l(int i)
    {
        return 2 * i + 1;
    }

    // right child
    int r(int i)
    {
        return 2 * i + 2;
    }

    // parent
    int p(int i)
    {
        return (i - 1) / 2;
    }

    void heapify(int i)
    {
        int L = l(i), R = r(i);
        int smallest = i;

        if(L < heapsize && tree[L] < tree[i])
            smallest = L;

        if(R < heapsize && tree[R] < tree[smallest])
            smallest = R;

        if(smallest != i)
        {
            long long value = tree[i];
            int index = key[i];

            tree[i] = tree[smallest];
            key[i]  = key[smallest];
            tree[smallest] = value;
            key[smallest]  = index;

            // Change positions.
            pos[key[smallest]] = smallest;
            pos[key[i]] = i;

            heapify(smallest);
        }
    }

public:
    MinHeap(int n) : N(n)
    {
        tree = new long long[n];
        key  = new int[n];
        pos  = new int[n];
        heapsize = 0;

        for(int i = 0; i < n; ++i)
            pos[i] = -1;
    }

    ~MinHeap()
    {
        delete[] tree;
        delete[] key;
        delete[] pos;
    }

    void add(int k, long long v)
    {
        if(heapsize < N)
        {
            int i = heapsize;
            while(i > 0 && v < tree[p(i)])
            {
                tree[i] = tree[p(i)];
                key[i] = key[p(i)];
                pos[key[i]] = i;
                i = p(i);
            }

            tree[i] = v;
            key[i] = k;
            pos[k] = i;
            heapsize++;
        }
    }

    int remove()
    {
        int index = key[0];
        heapsize--;
        tree[0] = tree[heapsize];
        key[0] = key[heapsize];
        pos[key[0]] = 0;
        pos[index] = -1;
        heapify(0);
        return index;
    }

    void decreaseKey(int k, long long v)
    {
        int i = pos[k];
        while(i > 0 && v < tree[p(i)])
        {
            tree[i] = tree[p(i)];
            key[i] = key[p(i)];
            pos[key[i]] = i;
            i = p(i);
        }

        tree[i] = v;
        key[i] = k;
        pos[k] = i;
    }

    bool contains(int k)
    {
        return pos[k] != -1;
    }

    bool isEmpty()
    {
        return heapsize == 0;
    }
};

int main()
{
    MinHeap minHeap(5);
    minHeap.add(1, 1);
    minHeap.add(2, 2);
    minHeap.add(3, 6);
    minHeap.add(4, 5);
    return 0;
}

