/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "Topas Website",
    description: "Website resmi perusahaan multifinance yang menampilkan informasi produk, promo, berita, dan form pengajuan. Dilengkapi dengan notifikasi email untuk tim internal.",
    image: "/projects/topas-website.png",
  },
  {
    id: 2,
    title: "Flow Survey Pinjaman Mobile Application",
    description: "Alur proses survey pengajuan pinjaman yang dilakukan oleh surveyor melalui aplikasi mobile.",
    image: "/projects/Flow Survey Pinjaman Mobile Application.jpg",
  },
  {
    id: 3,
    title: "UI: HRIS Web Absensi & Recruitment",
    description: "Tampilan antarmuka sistem HRIS internal perusahaan untuk absensi dan perekrutan.",
    image: "/projects/foto 1.png",
  },
  {
    id: 4,
    title: "UI: HRIS Web Man Power Planning",
    description: "Tampilan fitur perencanaan kebutuhan tenaga kerja dalam aplikasi HR.",
    image: "/projects/foto 2.png",
  },
  {
    id: 5,
    title: "UI: HRIS Web List Karyawan",
    description: "Antarmuka daftar seluruh karyawan perusahaan dalam sistem HRIS.",
    image: "/projects/foto 3.png",
  },
  {
    id: 6,
    title: "UI: HRIS Web KPI",
    description: "Antarmuka pengelolaan Key Performance Indicator (KPI) karyawan.",
    image: "/projects/foto 4.png",
  },
  {
    id: 7,
    title: "Mobile Survey App",
    description: "Desain awal aplikasi mobile untuk keperluan survey lapangan.",
    image: "/projects/mobile-survey-app.png",
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);

  const openModal = (project: any) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target as Node)) {
        closeModal();
      }
    };

    if (selectedProject) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/60 to-purple-900/60 backdrop-blur-sm">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg stroke=%22%2300ffff%22 strokeWidth=%221%22%3E%3Cpath d=%22M0 0h60v60H0z%22/%3E%3Cpath d=%22M15 0v60M30 0v60M45 0v60M0 15h60M0 30h60M0 45h60%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"]" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="cursor-pointer hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 h-[460px] flex flex-col justify-between" onClick={() => openModal(project)}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-contain rounded-lg mb-4 border border-white"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white text-sm line-clamp-4">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            All Projects ({projects.length})
          </Button>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-6 max-w-xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ❌
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-auto object-contain rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{selectedProject.title}</h3>
            <p className="text-gray-700">{selectedProject.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
