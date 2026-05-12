import React from 'react';
import BlogBanner from "@/app/blog/blog-banner/blog-banner";
import HomeMember from "@/app/home/home-member/home-member";

function Blog() {
    return (
        <div>
            <BlogBanner />
            <div className="my-5">
                <HomeMember />

            </div>

        </div>
    );
}

export default Blog;