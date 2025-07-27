import { useEffect, useState } from "react";
import axios from "axios";
import type { Category } from "../types/type";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import FeaturedRecipeCard from "../components/FeaturedRecipeCard";

export default function CategoryFeaturedRecipesWrapper() {
    const { slug } = useParams<{ slug: string }>();
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        axios.get(`http://localhost/recipesApp/public/api/category/${slug}`)
            .then(response => {
                setCategory(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message || "Terjadi Keasalaha");
                setLoading(false);
            })
    }, [slug]);

    if (loading) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>Error loading data: {error}</p>
    }

    if (!category) {
        return <p>Category not found</p>
    }

    return (
        <section id="MadeByPeople">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">Made by People</h2>
                <Link to={'/categories'}
                    className="font-semibold text-sm leading-[21px] text-[#FF4C1C]"
                >
                    Explore All
                </Link>
            </div>
            <div className="swiper w-full mt-3">
                <Swiper
                    className='w-full mt-3 '
                    direction='horizontal'
                    spaceBetween={16}
                    slidesPerView="auto"
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={15}
                >
                    {category.recipes.length > 0 ? (
                        category.recipes.map((recipe) => (
                        <SwiperSlide key={recipe.id} className="!w-fit">
                            <FeaturedRecipeCard recipes={recipe} />
                        </SwiperSlide>))) : (<p>Belum ada resep dengan kategori terkait</p>)}
                </Swiper>
            </div>
        </section>
    );
}