import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const milestones = [
  { year: '2010', title: 'Kurulu�', desc: "�kitelli'de 200 m� ile ba�lad�k." },
  { year: '2013', title: '�lk B�y�k Makine', desc: 'HP Latex 700W ile b�y�k format bask�ya girdik.' },
  { year: '2016', title: 'Fabrika Geni�lemesi', desc: '1200 m� yeni fabrikam�za ta��nd�k.' },
  { year: '2019', title: 'Kurumsal M��teriler', desc: 'Migros ve Efes Pilsen ile uzun vadeli anla�malar.' },
  { year: '2022', title: 'Online Platform', desc: 'bask�urunleri.com online sipari� platformunu hayata ge�irdik.' },
  { year: '2024', title: 'Bug�n', desc: '12.000+ m��teri, 81 ilde teslimat.' },
]

export default function TarihcePage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-[11px] tracking-[2.5px] uppercase font-bold text-[#DC2626] mb-3">Tarih�e</p>
        <h1 className="text-[40px] font-bold tracking-[-1px] mb-12"
          style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif' }}>
          Yolculu�umuz
        </h1>
        <div className="relative pl-8">
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px]"
            style={{ background: 'var(--border)' }} />
          {milestones.map((m, i) => (
            <div key={i} className="relative mb-10 last:mb-0">
              <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-[#DC2626] z-10" />
              <span className="text-[11px] font-bold text-[#DC2626] tracking-[1px]">{m.year}</span>
              <h3 className="text-[17px] font-bold mt-0.5 mb-1"
                style={{ color: 'var(--text-primary)', fontFamily: 'Georgia, serif' }}>{m.title}</h3>
              <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
