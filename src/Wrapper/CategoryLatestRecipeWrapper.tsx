import { useEffect, useState } from "react";
import { CategoryResultSearch } from "../components/CategoryResultSearch";
import type { Category } from "../types/type";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function CategoryLatestRecipeWrapper() {

    const { slug } = useParams<{ slug: string }>();
    const [category, setCategory] = useState<(Category | null)>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        axios.get(`http://localhost/recipesApp/public/api/category/${slug}`)
            .then(response => {
                setCategory(response.data.data);
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

    if (!category) {
        return <p>Belum ada recipe </p>
    }


    return (
        <section id="LatestRecipes" className="px-5 mt-[30px]">
            <div className="flex items-center justify-between">
                <h2 className="font-bold">Latest Recipes</h2>
            </div>
            <div className="flex flex-col gap-[18px] mt-[18px]">
                {category.recipes.length > 0 ? (
                    category.recipes.map((recipe) => (
                        <Link key={recipe.id} to={`/recipe/${recipe.slug}`}>
                            <CategoryResultSearch  recipes={recipe}></CategoryResultSearch>
                        </Link>
                    ))) : (<p>Belum ada recipe</p>)}
            </div>
        </section>
    );
}