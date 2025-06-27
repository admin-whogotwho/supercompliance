import { useEffect } from 'react'; // Removed 'React' from import
import { useLocation } from 'react-router-dom'; // Import useLocation to get current path

// SEO component: Dynamically sets meta tags for SEO.
// It manipulates document.title and meta tags directly.
// For more advanced SEO with server-side rendering, libraries like 'react-helmet-async' are often used.
const SEO = ({ title, description, keywords }) => {
  const location = useLocation(); // Get the current location object from React Router

  useEffect(() => {
    // Set page title
    // If a title is provided, use it. Otherwise, use a default site-wide title.
    document.title = title ? `${title} | WhoGotWho.com` : 'WhoGotWho.com: M&A, FDI, ODI, SEBI Compliance Insights';

    // Set meta description
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.setAttribute('name', 'description'); // Use setAttribute for consistency
      document.head.appendChild(metaDescriptionTag);
    }
    // If a description is provided, use it. Otherwise, use a default site-wide description.
    metaDescriptionTag.setAttribute('content', description || 'Comprehensive insights and tools for Mergers & Acquisitions, Foreign Direct Investment (FDI), Overseas Direct Investment (ODI), and SEBI compliances in India.');

    // Set meta keywords
    let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (!metaKeywordsTag) {
      metaKeywordsTag = document.createElement('meta');
      metaKeywordsTag.setAttribute('name', 'keywords'); // Use setAttribute
      document.head.appendChild(metaKeywordsTag);
    }
    // If keywords are provided, use them. Otherwise, use default site-wide keywords.
    metaKeywordsTag.setAttribute('content', keywords || 'corporate law, finance, India, regulations, business, investment, legal, financial advisory');

    // Add/Update Canonical URL: Essential for SPAs to avoid duplicate content issues
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    // Construct the full canonical URL using your actual deployed domain.
    // IMPORTANT: Replace 'https://whogotwho.com' with the exact primary domain of your live website on Vercel.
    const baseUrl = 'https://whogotwho.com'; // <--- **UPDATE THIS WITH YOUR ACTUAL VERCELL DOMAIN!**
    canonicalLink.setAttribute('href', `${baseUrl}${location.pathname}`);

  }, [title, description, keywords, location.pathname]); // Dependency array: re-run if these props or the URL path changes

  return null; // This component doesn't render any visible JSX
};

export default SEO;
