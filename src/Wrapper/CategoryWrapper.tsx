import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../components/CategoryCard";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Category } from "../types/type";
import { Link } from "react-router-dom";

export default function CategoryWrapper() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        axios.get('http://localhost/recipesApp/public/api/categories')
            .then(response => {
                setCategories(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>Error loading data: {error}</p>
    }

    return (
        <section id="Categories" className="mt-[30px]">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">By Categories</h2>
            </div>
            <div className="swiper w-full mt-3">
                <Swiper
                    className="w-full mt-3"
                    direction='horizontal'
                    spaceBetween={16}
                    slidesPerView="auto"
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={20}>
                    {/* maping data category */}
                    {categories.map((categories) => (
                        <SwiperSlide key={categories.id} className="!w-fit pb-[30px]">
                            <Link to={`/category/${categories.slug}`}>
                            <CategoryCard category={categories} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}