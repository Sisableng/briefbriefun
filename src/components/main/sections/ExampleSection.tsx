import { Scroller } from "@/components/ui/scroller";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Markdown from "react-markdown";

export default function ExampleSection() {
  const content = `
## Nama Perusahaan  
MiauTech

## Deskripsi Perusahaan  
Kami adalah startup teknologi yang membuat wearable device untuk hewan peliharaan, terutama kucing. Produk kami membantu pemilik melacak aktivitas, tidur, dan mood kucing mereka secara real-time. Target kami adalah millennial cat parents yang tech-savvy. Kami ingin terlihat fun, smart, dan sedikit quirky.

## Deskripsi Pekerjaan  
Kami ingin membuat landing page yang menjelaskan produk baru kami — kalung pintar untuk kucing bernama *MeowSync*. Halaman ini akan menjadi pusat informasi, sekaligus tempat pre-order. Kami ingin desainnya playful tapi tetap profesional, dengan warna utama ungu dan mint. Ada animasi kecil juga boleh.

## Spesifikasi Teknis  
- Desain mobile-first  
- Gunakan font sans-serif modern  
- Sertakan section: Hero, Fitur, Testimoni, CTA, dan FAQ  
- Integrasi tombol pre-order (dummy)

## Batas Waktu  
5 hari dari sekarang

## Vibe  
fun
`;

  return (
    <section className="container w-full space-y-10 md:space-y-20">
      <div className="grid gap-10 md:grid-cols-2">
        <h1 className="flex-1 shrink-0">
          Contoh Brief <br /> dari Klien Gaib
        </h1>

        <p className="text-muted-foreground">
          Masih bingung kayak apa sih brief dari klien fiktif itu? Nih, kita
          kasih contoh biar kamu nggak nebak-nebak sendiri. Siap-siap ketemu
          permintaan yang kadang masuk akal… kadang juga nggak.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-5">
        <div className="flex h-full shrink-0 flex-col gap-4 rounded-xl">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Type</p>
            <p className="font-semibold">Web Design</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Industri</p>
            <p className="font-semibold">Teknologi</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Vibe</p>
            <p className="font-semibold">Fun</p>
          </div>

          <div className="bg-card/50 mt-10 hidden w-full flex-1 rounded-full not-dark:border md:block"></div>
        </div>

        <div className="bg-card dark prose prose-invert not-dark:bg-secondary w-full max-w-full flex-1 rounded-xl px-4 py-4 md:col-span-3 md:px-10">
          <Scroller>
            <div className="mx-auto max-h-[40rem] w-full max-w-prose">
              <Markdown>{content}</Markdown>
            </div>
          </Scroller>
        </div>

        <div className="hidden h-full min-h-0 shrink-0 flex-col gap-4 md:flex">
          <div className="bg-card/50 w-full flex-1 rounded-full not-dark:border"></div>

          <div className="bg-card/50 mt-auto size-60 rounded-full not-dark:border"></div>
        </div>
      </div>
    </section>
  );
}
