# TechBlog - Modern Tech Blogging Website

A modern, AdSense-compliant tech blogging website built with Next.js 14+, TypeScript, and Tailwind CSS. This project is designed to meet Google AdSense requirements with essential pages, proper navigation, and optimized performance.

## 🌟 Features

### AdSense-Compliance Essentials
- ✅ **Required Pages**: About, Contact, Privacy Policy, Terms of Service, and Disclaimer pages with real, substantial content
- ✅ **Consistent Navigation**: Site-wide navigation menu and footer linking to all important pages
- ✅ **Mobile-Responsive Design**: Fully responsive layout that works on all devices (Google checks this)
- ✅ **Fast Loading**: Optimized performance with minimal layout shift
- ✅ **No Intrusive Elements**: No pop-ups, auto-playing media, or intrusive interstitials
- ✅ **Clean URL Structure**: `/blog/post-slug` format instead of query strings

### SEO Optimization
- ✅ Meta titles and descriptions on every page
- ✅ Open Graph tags for social sharing
- ✅ JSON-LD Article structured data on blog posts
- ✅ Canonical URLs
- ✅ robots.txt and sitemap.xml
- ✅ Favicon and proper site branding

### Content Management
- ✅ MDX/Markdown support for blog posts in `/content/posts`
- ✅ 10 sample blog posts covering AI, programming, gadgets, and industry news
- ✅ Proper frontmatter for each post (title, description, date, author, category, tags, coverImage, slug)
- ✅ Semantic heading structure (H1 > H2 > H3)
- ✅ Internal linking between posts

### Development Experience
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ App Router for modern Next.js routing
- ✅ Hot module replacement for fast development
- ✅ ESLint and TypeScript configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tech-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the blog.

## 📁 Project Structure

```
tech-blog/
├── content/
│   └── posts/           # MDX blog posts
├── public/              # Static assets (favicon, robots.txt, sitemap.xml)
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── layout.tsx   # Root layout with navigation
│   │   ├── page.tsx     # Homepage
│   │   ├── about/       # About page
│   │   ├── contact/     # Contact page
│   │   ├── privacy-policy/
│   │   ├── terms-of-service/
│   │   ├── disclaimer/
│   │   └── blog/
│   │       ├── page.tsx # Blog listing page
│   │       └── [slug]/  # Dynamic blog post pages
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AdSlot.tsx   # AdSense placeholder component
│   └── lib/             # Utility functions
│       └── posts.ts     # Blog post utilities
├── package.json
└── tailwind.config.js
```

## 📝 Content Management

### Adding New Blog Posts

1. Create a new MDX file in `content/posts/` directory
2. Use the following frontmatter template:

```mdx
---
title: 'Your Blog Post Title'
description: 'A brief description of your blog post'
date: 'YYYY-MM-DD'
author: 'Your Name'
category: 'Category Name'
tags: ['tag1', 'tag2', 'tag3']
coverImage: '/images/your-image.jpg'
slug: 'your-blog-post-slug'
---

Your blog post content here...

## Heading 1

Content...

### Heading 2

More content...

Read about [related topic](/blog/related-post-slug) in our other article.
```

### Frontmatter Fields

- **title**: The title of your blog post (will be displayed as H1)
- **description**: A brief description (used in meta tags and preview cards)
- **date**: Publication date in YYYY-MM-DD format
- **author**: Name of the author
- **category**: Main category of the post
- **tags**: Array of tags for the post
- **coverImage**: Path to the cover image (place images in `public/images/`)
- **slug**: URL-friendly identifier for the post

## 🎨 Customization

### Changing Colors and Styling

1. **Edit Tailwind Configuration**: Modify `tailwind.config.js` to customize colors, fonts, and spacing

2. **Update CSS Variables**: Edit `src/app/globals.css` for custom CSS variables

3. **Component Styling**: Update individual components in `src/components/` to match your brand

### Updating Site Information

1. **Site Metadata**: Edit `src/app/layout.tsx` to update the site title and description

2. **Navigation**: Modify `src/components/Navbar.tsx` to add/remove navigation links

3. **Footer**: Update `src/components/Footer.tsx` to change footer content and links

4. **About/Contact Pages**: Edit the respective page files in `src/app/` to update content

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Vercel will automatically detect Next.js and configure the build

3. **Deploy**: Click "Deploy" and wait for the build to complete

### Custom Domain Setup

To use your custom domain with Vercel:

1. **Add Domain in Vercel**:
   - Go to your project in Vercel Dashboard
   - Navigate to "Settings" → "Domains"
   - Add your custom domain (e.g., `techblog.com`)

2. **Configure DNS**:
   - **Option A (Recommended)**: Use Vercel's nameservers
     - Update your domain's nameservers to point to Vercel
   - **Option B**: Add DNS records
     - Add a CNAME record pointing to `cname.vercel-dns.com`
     - Or add A records pointing to Vercel's IP addresses

3. **Update Configuration**:
   - Update `public/robots.txt` with your actual domain
   - Update `public/sitemap.xml` with your actual domain
   - Update any hardcoded URLs in your components

4. **SSL Certificate**: Vercel automatically provisions SSL certificates for custom domains

### Other Deployment Options

#### Netlify
1. Connect your Git repository to Netlify
2. Set build command to `npm run build`
3. Set publish directory to `.next`

#### Self-Hosted
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Configure your web server (Nginx, Apache) to proxy requests to the Next.js server

## 📊 AdSense Integration

### After AdSense Approval

1. **Add AdSense Script**: Add the following to `src/app/layout.tsx`:

```tsx
import Script from 'next/script';

// In the <head> section:
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
/>
```

2. **Use AdSlot Component**: Import and use the `AdSlot` component in your pages:

```tsx
import AdSlot from '@/components/AdSlot';

// In your page/component:
<AdSlot adSlotId="XXXXXXXXXX" className="my-8" />
```

3. **Remove Placeholder**: Remove the placeholder content from the `AdSlot` component and replace with actual AdSense code.

## 🔍 SEO Best Practices

### Content Guidelines for AdSense Approval

- **Write High-Quality Content**: Ensure all posts are well-researched and provide value
- **Use Proper Heading Structure**: H1 for titles, H2 for sections, H3 for subsections
- **Include Internal Links**: Link to other posts on your site
- **Optimize Images**: Use descriptive alt text and compress images
- **Regular Updates**: Publish new content regularly to show the site is active

### Technical SEO

- **Page Speed**: Optimize images, minimize JavaScript, use caching
- **Mobile-Friendly**: Test with Google's Mobile-Friendly Test
- **Structured Data**: JSON-LD markup is already included for blog posts
- **XML Sitemap**: Already included at `public/sitemap.xml`
- **Robots.txt**: Already included at `public/robots.txt`

## 🛠️ Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file with your component
3. Update the navigation in `src/components/Navbar.tsx`
4. Update the footer in `src/components/Footer.tsx`

### Custom Components

The `AdSlot` component is included as a placeholder for Google AdSense. You can:

1. Create additional reusable components in `src/components/`
2. Follow the existing patterns for styling with Tailwind CSS
3. Use TypeScript for type safety

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Google AdSense Policies](https://support.google.com/adsense/answer/1348688)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- MDX support by [@next/mdx](https://www.npmjs.com/package/@next/mdx)
- Deployed on [Vercel](https://vercel.com/)