# API Layer & Supabase Client

Gradivus Code menggunakan **Supabase** sebagai database cloud portofolio. Komunikasi data dilakukan dari halaman Client Component ke Next.js API Routes (Route Handlers) yang melakukan query database.

## 1. Konfigurasi Client Supabase (`lib/supabase.js`)

Inisialisasi koneksi SDK client dilakukan sekali di file `lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL atau Anon Key belum dikonfigurasi di file env!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 2. Next.js API Route Handlers (`app/api/portfolio/route.js`)

Untuk mengamankan database, buat endpoint API serverless di `/api/portfolio` untuk menangani aksi CRUD:

```javascript
// app/api/portfolio/route.js
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Ambil semua data portofolio
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Tambah portofolio baru
export async function POST(request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('portfolio')
      .insert([body])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT/PATCH: Update portofolio
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const { data, error } = await supabase
      .from('portfolio')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Hapus portofolio
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter wajib diisi' }, { status: 400 });
    }

    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 3. Melakukan Call API dari Komponen (Client-Side Fetch)

Berikut cara memicu call API CRUD di dalam komponen React:

```javascript
// Fetch Data (GET)
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchItems() {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }
  fetchItems();
}, []);

// Tambah/Simpan Data (POST)
const handleAdd = async (newItem) => {
  const res = await fetch('/api/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  });
  if (res.ok) {
    const savedItem = await res.json();
    setItems((prev) => [savedItem, ...prev]);
  }
};

// Hapus Data (DELETE)
const handleDelete = async (id) => {
  const res = await fetch(`/api/portfolio?id=${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    setItems((prev) => prev.filter(item => item.id !== id));
  }
};
```

## Rules

1.  **Environment Variables Protection:** Endpoint Supabase URL & Key wajib menggunakan awalan kustom `NEXT_PUBLIC_` agar dapat diakses dari browser.
2.  **No Direct Database Client Queries:** Jangan melakukan direct write dari Client Components ke DB. Gunakan API Route `/api/portfolio` sebagai middleware.
3.  **Always Try-Catch:** Bungkus parsing JSON dan server responses dengan try-catch untuk mengantisipasi network errors.
4.  **Security Rules:** Tambahkan security rules di dashboard Supabase (RLS - Row Level Security) agar write operations hanya bisa diakses oleh authenticated users.
