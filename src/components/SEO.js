 import { useEffect } from 'react'; // This import is necessary for useEffect

    // SEO component: Manages document title dynamically.
    const SEO = ({ title, description, keywords }) => {
        useEffect(() => {
            document.title = `${title} | WhoGotWho`;
            // Optionally, add meta description and keywords for better SEO
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.name = 'description';
                document.head.appendChild(metaDescription);
            }
            metaDescription.content = description || "Market insights and regulatory compliance for India";

            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = keywords || "FDI, ODI, SEBI, compliance, India, M&A, market insights";

        }, [title, description, keywords]);
        return null;
    };

    export default SEO; // This line makes the SEO component available for import in other files