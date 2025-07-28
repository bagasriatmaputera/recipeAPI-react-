import { SwiperSlide, Swiper } from "swiper/react";
import FeaturedRecipeCard from "../components/FeaturedRecipeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Recipe } from "../types/type";
import { Link } from "react-router-dom";

export default function FeaturedWrapper() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        axios.get('http://localhost/recipesApp/public/api/recipes')
            .then(response => {
                setRecipes(response.data.data);
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
        <section id="MadeByPeople">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">Made by People</h2>
                <a
                    href="#"
                    className="font-semibold text-sm leading-[21px] text-[#FF4C1C]"
                >
                    Explore All
                </a>
            </div>
            <div className="swiper w-full mt-3">
                <Swiper
                    className='w-full mt-3'
                    direction='horizontal'
                    spaceBetween={16}
                    slidesPerView="auto"
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={15}
                >
                    {recipes.map((recipes) => (
                        <SwiperSlide key={recipes.id} className="!w-fit">
                            <Link to={`/recipe/${recipes.slug}`}>
                            <FeaturedRecipeCard recipes={recipes} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}