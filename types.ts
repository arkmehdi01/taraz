import React from 'react';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  logo?: string;
}

export interface Performance {
  totalCases: number;
  winRate: number;
  satisfaction: number;
  monthlyActivity: number[]; // Array of numbers for a simple chart
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Lawyer {
  id: string;
  name: string;
  title: string;
  licenseNumber: string;
  specialties: string[];
  description: string;
  imageUrl: string;
  education: string[];
  experience: string; // Keeping simple string for legacy compatibility or upgrade to object array
  experienceList?: ExperienceItem[]; // New structured experience
  rating: number;
  location: Location;
  performance: Performance;
  certifications: Certification[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  topics: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}