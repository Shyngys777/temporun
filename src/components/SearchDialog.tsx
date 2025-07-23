
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
import { useSearchProducts } from "@/hooks/useProducts";
import { useBrands } from "@/hooks/useBrands";
import { useCategories } from "@/hooks/useCategories";


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
    
    const { data: searchResults } = useSearchProducts(searchQuery);
    const { data: brands } = useBrands();
    const { data: categories } = useCategories();

    const handleSelect = (href: string) => {
        setOpen(false);
        navigate(href);
        setSearchQuery("");
    };

    const filteredProducts = searchResults || [];

    const filteredBrands = searchQuery
        ? (brands || []).filter((brand) =>
            brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const filteredCategories = searchQuery
        ? (categories || []).filter((category) =>
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
                                onSelect={() => handleSelect(`/product/${product.slug}`)}
                                className="flex items-center py-2 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium">{product.name}</span>
                                    <span className="text-sm text-muted-foreground">
                    {product.brand.name} • {product.category?.name || 'Running'}
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
                                onSelect={() => handleSelect(`/brands/${brand.slug}`)}
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
                                onSelect={() => handleSelect(`/categories/${category.slug}`)}
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