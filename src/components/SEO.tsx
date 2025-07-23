
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
    noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
                                     title = "Premium Running Store | KazRun",
                                     description = "Kazakhstan's premier running store featuring top brands, expert advice, and gear for runners of all levels.",
                                     keywords = "running shoes, running gear, Kazakhstan, adidas, nike, ASICS, running store",
                                     ogImage = "/og-image.jpg",
                                     ogUrl,
                                     noIndex = false
                                 }) => {
    const siteUrl = window.location.origin;
    const url = ogUrl || window.location.href;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${siteUrl}${ogImage}`} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

            {/* No Index if specified */}
            {noIndex && (
                <meta name="robots" content="noindex, nofollow" />
            )}
        </Helmet>
    );
};

export default SEO;