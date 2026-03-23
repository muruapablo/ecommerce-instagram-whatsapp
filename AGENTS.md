# AI Development Rules

This repository contains a reusable ecommerce template optimized for selling products through Instagram and WhatsApp.

The AI agent must follow these development rules when generating or modifying code.

---

# Project Goal

Build a minimal but production-ready ecommerce that can be cloned for multiple stores.

Each store must be able to:

- display products
- receive payments
- allow the owner to manage products
- integrate WhatsApp conversations
- be deployed quickly

The architecture must allow easy scaling to a multi-tenant platform in the future.

---

# Tech Stack

Frontend
Next.js 14
App Router
TypeScript
TailwindCSS

Backend
Next.js API routes

Database
Supabase (PostgreSQL)

Payments
Mercado Pago

Hosting
Vercel

---

# Architecture Principles

1. Code must be modular.
2. Components must be reusable.
3. Project must support cloning for multiple stores.
4. Mobile-first UI design.
5. Keep dependencies minimal.
6. Use server components where possible.
7. Separate UI, logic and services.

---

# Folder Structure

/app
pages and routes

/components
reusable UI components

/lib
service integrations (Supabase, Mercado Pago)

/config
store configuration

/api
server endpoints

---

# Store Configuration

Every store must be configurable from a single file:

config/store.ts

Example:

export const store = {
  name: "Mi Tienda",
  whatsapp: "5493510000000",
  instagram: "mitienda",
  logo: "/logo.png",
  primaryColor: "#000000"
}

The project must read store configuration dynamically.

---

# Admin Panel Requirements

The admin panel must support a full CRUD for products.

Features:

- list products
- create product
- edit product
- delete product

Routes:

/admin
/admin/productos
/admin/productos/nuevo
/admin/productos/[id]/editar

---

# Product Page Requirements

Each product page must show:

- image
- name
- description
- price

Buttons:

- Buy with Mercado Pago
- Contact via WhatsApp

---

# WhatsApp Integration

Generate links dynamically:

https://wa.me/{phone}?text=Hola quiero consultar por {product}

---

# Payment Integration

Create an API endpoint:

/api/checkout

This endpoint must:

- create Mercado Pago preference
- redirect user to checkout

---

# Payment Webhook

Create endpoint:

/api/webhook

When payment is approved:

- store order in database
- update order status

---

# Database Schema

Table productos

id uuid
nombre text
slug text
precio numeric
descripcion text
imagen text
stock integer
activo boolean
created_at timestamp

Table pedidos

id uuid
producto_id uuid
cantidad integer
precio_total numeric
estado text
created_at timestamp

---

# UI Rules

Use TailwindCSS.

Design principles:

- clean layout
- fast loading
- mobile optimized
- Instagram traffic focused

---

# Reusability

This project must work as a template.

Each new store should be created by:

cloning the repository

changing store configuration

deploying to Vercel.

---

# Future scalability

The architecture must allow future migration to multi-store SaaS.

Potential future table:

stores

id
name
slug
whatsapp
logo
primary_color

Products would include store_id.

---

# Development Behavior

When generating code:

- create clear file structures
- avoid large monolithic files
- use reusable components
- document complex logic
- prioritize readability