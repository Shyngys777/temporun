
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample search data - this would typically come from your API/database
const searchData = {
    products: [
        { id: "1", name: "Ultraboost Light", brand: "Adidas", category: "road-running", href: "/product/1" },
        { id: "2", name: "Pegasus 40", brand: "Nike", category: "road-running", href: "/product/2" },
        { id: "3", name: "Fresh Foam X 1080v12", brand: "New Balance", category: "road-running", href: "/product/3" },
        { id: "4", name: "Gel-Kayano 29", brand: "Asics", category: "road-running", href: "/product/4" },
        { id: "5", name: "Ultra Trail", brand: "Nike", category: "trail-running", href: "/product/5" },
        { id: "6", name: "Speedcross 6", brand: "Salomon", category: "trail-running", href: "/product/6" },
    ],
    brands: [
        { id: "nike", name: "Nike", href: "/brands/nike" },
        { id: "adidas", name: "Adidas", href: "/brands/adidas" },
        { id: "newbalance", name: "New Balance", href: "/brands/new-balance" },
        { id: "asics", name: "Asics", href: "/brands/asics" },
        { id: "saucony", name: "Saucony", href: "/brands/saucony" },
    ],
    categories: [
        { id: "road-running", name: "Road Running", href: "/categories/road-running" },
        { id: "trail-running", name: "Trail Running", href: "/categories/trail-running" },
        { id: "competition", name: "Competition", href: "/categories/competition" },
    ],
};

export function SearchButton() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
                className="text-black/80 hover:text-black transition-colors"
                aria-label="Search"
            >
                <Search className="h-5 w-5" />
            </Button>
            <SearchDialog open={open} setOpen={setOpen} />
        </>
    );
}

interface SearchDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function SearchDialog({ open, setOpen }: SearchDialogProps) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSelect = (href: string) => {
        setOpen(false);
        navigate(href);
        setSearchQuery("");
    };

    const filteredProducts = searchQuery
        ? searchData.products.filter(
            (product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const filteredBrands = searchQuery
        ? searchData.brands.filter((brand) =>
            brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const filteredCategories = searchQuery
        ? searchData.categories.filter((category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput
                    placeholder="Search products, brands, categories..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
                {searchQuery && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSearchQuery("")}
                        className="h-6 w-6"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <CommandList className="max-h-[400px]">
                <CommandEmpty>No results found.</CommandEmpty>

                {filteredProducts.length > 0 && (
                    <CommandGroup heading="Products">
                        {filteredProducts.map((product) => (
                            <CommandItem
                                key={product.id}
                                onSelect={() => handleSelect(product.href)}
                                className="flex items-center py-2 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium">{product.name}</span>
                                    <span className="text-sm text-muted-foreground">
                    {product.brand} • {product.category.replace("-", " ")}
                  </span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {filteredBrands.length > 0 && (
                    <CommandGroup heading="Brands">
                        {filteredBrands.map((brand) => (
                            <CommandItem
                                key={brand.id}
                                onSelect={() => handleSelect(brand.href)}
                                className="cursor-pointer"
                            >
                                {brand.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {filteredCategories.length > 0 && (
                    <CommandGroup heading="Categories">
                        {filteredCategories.map((category) => (
                            <CommandItem
                                key={category.id}
                                onSelect={() => handleSelect(category.href)}
                                className="cursor-pointer"
                            >
                                {category.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </CommandDialog>
    );
}

export default SearchButton;