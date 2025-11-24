import React from "react";
import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "features-section" },
  { label: "Workflow", href: "workflow-section" },
  { label: "Pricing", href: "pricing-section" },
  { label: "Testimonials", href: "testimonials-section" },
];

// -----------------------------

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Drag-and-Drop Interface",
    description:
      "Easily design and arrange your VR environments with a user-friendly drag-and-drop interface.",
  },
  {
    icon: <Fingerprint />,
    text: "Multi-Platform Compatibility",
    description:
      "Build VR applications that run seamlessly across multiple platforms, including mobile, desktop, and VR headsets.",
  },
  {
    icon: <ShieldHalf />,
    text: "Built-in Templates",
    description:
      "Jumpstart your VR projects with a variety of built-in templates for different types of applications and environments.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Preview",
    description:
      "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
  },
  {
    icon: <PlugZap />,
    text: "Collaboration Tools",
    description:
      "Work together with your team in real-time on VR projects, enabling seamless collaboration and idea sharing.",
  },
  {
    icon: <GlobeLock />,
    text: "Analytics Dashboard",
    description:
      "Gain valuable insights into user interactions and behavior within your VR applications with an integrated analytics dashboard.",
  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
// Fallback data jika API tidak tersedia
export const fallbackGenres = [
  {
    id: 1,
    name: "Action & Adventure",
    description:
      "High-octane thrillers, epic battles, and adrenaline-pumping sequences",
    image:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Drama",
    description:
      "Compelling stories with deep character development and emotional journeys",
    image:
      "https://images.unsplash.com/photo-1489599809505-fb44910c04f0?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Comedy",
    description: "Laugh-out-loud movies and series that will brighten your day",
    image:
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Sci-Fi & Fantasy",
    description:
      "Explore new worlds and futuristic technologies beyond imagination",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Horror",
    description:
      "Spine-chilling stories that will keep you on the edge of your seat",
    image:
      "https://images.unsplash.com/photo-1496395031280-4201b0e022ca?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Documentary",
    description:
      "Real stories, real people, and fascinating insights into our world",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop",
  },
  {
    id: 7,
    name: "Romance",
    description: "Heartwarming love stories and emotional connections",
    image:
      "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=200&h=200&fit=crop",
  },
  {
    id: 8,
    name: "Animation",
    description: "Creative animated features for all ages and tastes",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=200&fit=crop",
  },
];

export const fallbackBenefits = [
  {
    id: 1,
    title: "Watch on Any Device",
    description: "Stream on your phone, tablet, laptop, and TV without limits",
  },
  {
    id: 2,
    title: "Download & Go",
    description: "Download your favorites to watch offline anywhere",
  },
  {
    id: 3,
    title: "No Ads, Ever",
    description: "Enjoy uninterrupted streaming with no commercial breaks",
  },
  {
    id: 4,
    title: "4K Ultra HD Quality",
    description:
      "Experience crystal-clear picture with our highest streaming quality",
  },
  {
    id: 5,
    title: "Multiple Profiles",
    description:
      "Create up to 5 profiles for different members of your household",
  },
  {
    id: 6,
    title: "Cancel Anytime",
    description: "No commitments, cancel your subscription whenever you want",
  },
];
