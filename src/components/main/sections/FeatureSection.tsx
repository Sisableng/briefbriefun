import React from "react";
import ListItem from "../stuff/ListItem";

export default function FeatureSection() {
  return (
    <section className="container grid gap-10 md:grid-cols-2 md:gap-20">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card h-60 rounded-full not-dark:border md:h-80"></div>
        <div className="bg-primary/50 h-60 rotate-45 rounded-full md:h-80"></div>
        <div className="bg-card h-60 rounded-full not-dark:border md:h-80"></div>
      </div>

      <div className="space-y-6">
        <h1>
          Trus fitur nya <br /> Aapa aja bang? 🤔
        </h1>
        <p className="text-muted-foreground">
          Dari klien fiktif yang absurd sampai brief yang sok profesional —
          semua bisa kamu dapat di sini. Nggak perlu drama revisi, tinggal klik
          dan langsung gas!.
        </p>

        <ul className="list-inside list-disc space-y-8">
          <ListItem number={1}>
            <h5 className="font-bold">AI Brief Generator</h5>
            <p className="text-muted-foreground leading-relaxed">
              Dapatkan brief acak dari “klien” dengan berbagai gaya, kebutuhan,
              dan tantangan.
            </p>
          </ListItem>
          <ListItem number={2}>
            <h5 className="font-bold">Simpan & Kelola Proyekmu</h5>
            <p className="text-muted-foreground leading-relaxed">
              Bangun portofolio dari brief-briefan yang kamu kerjakan.
            </p>
          </ListItem>
          <ListItem number={3}>
            <h5 className="font-bold">Login Sekali, Gas Terus</h5>
            <p className="text-muted-foreground leading-relaxed">
              Buat akun dan lanjutkan progres kamu kapan aja.
            </p>
          </ListItem>
        </ul>
      </div>
    </section>
  );
}
