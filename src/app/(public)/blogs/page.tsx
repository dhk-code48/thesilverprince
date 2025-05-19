"use client";

import { useState, useMemo, useEffect } from "react";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  TrendingUp,
  Filter,
  ArrowUpDown,
  Star,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Define the Blog type based on your model
interface SilverPrinceBlog {
  id: string;
  title: string;
  description: string;
  content: string;
  banner: string;
  draft: boolean;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounce("", 500);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [allBlogs, setAllBlogs] = useState<SilverPrinceBlog[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<SilverPrinceBlog[] | null>(
    null
  );

  const BLOGS_PER_PAGE = 6;

  // Create a reference to the blogs collection
  const blogsRef = collection(db, "Blogs");

  // Create a query with sorting and limit - only show non-draft blogs
  const blogsQuery = useMemo(() => {
    return query(
      blogsRef,
      where("draft", "==", false),
      orderBy("createdAt", sortOrder),
      limit(BLOGS_PER_PAGE)
    );
  }, [blogsRef, sortOrder]);

  // Fetch blogs using tanstack-query-firebase
  const { data, isLoading, isError, error, refetch } = useCollectionQuery(
    blogsQuery,
    {
      queryKey: ["blogs", sortOrder, BLOGS_PER_PAGE],
    }
  );

  // Set up intersection observer for infinite scrolling
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
  });

  // Update search term with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setDebouncedSearchTerm]);

  // Convert the data to a more usable format and update state
  useEffect(() => {
    if (data?.docs) {
      const fetchedBlogs = data.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as SilverPrinceBlog)
      );

      if (lastVisible === null) {
        // Initial load
        setAllBlogs(fetchedBlogs);

        // Set featured blog if any
        const featured = fetchedBlogs.filter((blog) => blog.featured);
        if (featured) {
          setFeaturedBlog(featured);
          // Remove featured blog from the main list
          const remainingBlogs = fetchedBlogs.filter((blog) => !blog.featured);
          setAllBlogs(remainingBlogs);
        }
      }

      // Set the last visible document for pagination
      if (data.docs.length > 0) {
        setLastVisible(data.docs[data.docs.length - 1]);
      } else {
        setHasMore(false);
      }
    }
  }, [data, lastVisible]);

  // Load more blogs when scrolling to the bottom
  useEffect(() => {
    const loadMoreBlogs = async () => {
      if (!lastVisible || isLoadingMore) return;

      setIsLoadingMore(true);

      try {
        const nextQuery = query(
          blogsRef,
          where("draft", "==", false),
          orderBy("createdAt", sortOrder),
          startAfter(lastVisible),
          limit(BLOGS_PER_PAGE)
        );

        const nextSnapshot = await getDocs(nextQuery);

        if (nextSnapshot.empty) {
          setHasMore(false);
        } else {
          const nextBlogs = nextSnapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as SilverPrinceBlog)
          );

          // If we have a featured blog, make sure we don't add it again
          const filteredNextBlogs = featuredBlog
            ? nextBlogs.filter((blog) => !blog.featured)
            : nextBlogs;

          setAllBlogs((prev) => [...prev, ...filteredNextBlogs]);
          setLastVisible(nextSnapshot.docs[nextSnapshot.docs.length - 1]);
        }
      } catch (error) {
        console.error("Error loading more blogs:", error);
      } finally {
        setIsLoadingMore(false);
      }
    };

    if (inView && hasMore && !isLoading && !isLoadingMore) {
      loadMoreBlogs();
    }
  }, [
    inView,
    hasMore,
    isLoading,
    isLoadingMore,
    blogsRef,
    featuredBlog,
    lastVisible,
    sortOrder,
  ]);

  // Filter blogs based on search term and featured flag
  const filteredBlogs = useMemo(() => {
    let filtered = allBlogs;

    // Filter by search term
    if (debouncedSearchTerm.trim()) {
      filtered = filtered.filter(
        (blog) =>
          blog.title
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          blog.description
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Filter by featured flag if enabled
    if (showFeaturedOnly) {
      filtered = filtered.filter((blog) => blog.featured);
    }

    return filtered;
  }, [allBlogs, debouncedSearchTerm, showFeaturedOnly]);

  // Format date
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setShowFeaturedOnly(false);
    setSortOrder("desc");
  };

  // Calculate read time (approximately 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return readTime < 1 ? 1 : readTime;
  };

  useEffect(() => {
    console.log("error?.message ", error?.message);
  }, [error]);

  return (
    <div className="space-y-5 mt-5 min-h-screen">
      {/* Hero Section with Featured Blog */}
      <section className="relative w-full overflow-hidden">
        <div className="z-10 relative space-y-5 mx-auto container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="bg-clip-text bg-gradient-to-r from-primary/60 to-primary font-bold text-transparent text-4xl md:text-5xl leading-20">
              Our Blog
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover the latest stories, tutorials, and insights from our team
              of writers and contributors.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-5">
            {/* Featured Blog */}
            {featuredBlog &&
              featuredBlog?.map((featuredBlog) => (
                <motion.div
                  key={featuredBlog.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-16"
                >
                  <div className="group relative rounded-xl overflow-hidden">
                    <div className="z-10 absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

                    <div className="relative w-full aspect-[21/9] overflow-hidden">
                      <Image
                        width={1980}
                        height={1024}
                        src={
                          featuredBlog.banner ||
                          "/placeholder.svg?height=600&width=1200"
                        }
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="right-0 bottom-0 left-0 z-20 absolute p-6 md:p-8">
                      <Badge className="bg-purple-500 hover:bg-purple-600 mb-4">
                        Featured
                      </Badge>
                      <h2 className="mb-2 font-bold text-white group-hover:text-purple-300 text-2xl md:text-3xl line-clamp-2 transition-colors">
                        {featuredBlog.title}
                      </h2>
                      <p className="mb-4 max-w-3xl text-gray-200 line-clamp-1">
                        {featuredBlog.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredBlog.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {calculateReadTime(featuredBlog.content)} min read
                        </span>
                      </div>
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 mt-4"
                        onClick={() =>
                          (window.location.href = `/blogs/${featuredBlog.id}`)
                        }
                      >
                        Read Article
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto -mt-8 px-4 py-8 container">
        {/* Search and Filter Controls */}
        <div className="bg-card shadow-lg mb-8 p-4 border border-border/50 rounded-xl">
          <div className="flex md:flex-row flex-col gap-4">
            <div className="relative flex-1">
              <motion.div
                animate={isSearchFocused ? { scale: 0.97 } : { scale: 1 }}
                className="relative"
              >
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-200",
                    isSearchFocused ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <Input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={cn(
                    "pl-10 transition-all duration-200 border-muted",
                    isSearchFocused
                      ? "ring-2 ring-primary/20 border-primary"
                      : ""
                  )}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="top-1/2 right-2 absolute w-6 h-6 -translate-y-1/2 transform"
                    onClick={() => setSearchTerm("")}
                  >
                    <span className="sr-only">Clear search</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                )}
              </motion.div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "flex items-center gap-1",
                  showFeaturedOnly && "bg-primary/10 border-primary/30"
                )}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              >
                <Star
                  className={cn(
                    "h-3.5 w-3.5",
                    showFeaturedOnly && "fill-primary text-primary"
                  )}
                />
                {"Featured Only"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() =>
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                }
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                {sortOrder === "desc" ? "Newest first" : "Oldest first"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "flex items-center gap-1",
                  (searchTerm || showFeaturedOnly || sortOrder !== "desc") &&
                    "bg-primary/10"
                )}
                onClick={resetFilters}
              >
                <Filter className="w-3.5 h-3.5" />
                Reset filters
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full aspect-video">
                  <Skeleton className="w-full h-full" />
                </div>
                <CardHeader>
                  <Skeleton className="mb-2 w-3/4 h-6" />
                  <Skeleton className="w-1/3 h-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="mb-2 w-full h-4" />
                  <Skeleton className="mb-2 w-full h-4" />
                  <Skeleton className="w-2/3 h-4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="w-full h-9" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 border border-border rounded-xl text-center"
          >
            <div className="inline-flex justify-center items-center bg-red-100 dark:bg-red-900/20 mb-4 rounded-full w-16 h-16 text-red-600 dark:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-xl">Error loading blogs</h3>
            <p className="mb-6 text-muted-foreground line-clamp-2 text-wrap">
              {error?.message || "Something went wrong. Please try again."}
            </p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </motion.div>
        )}

        {/* No Results */}
        {!isLoading && !isError && filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 border border-border rounded-xl text-center"
          >
            <div className="inline-flex justify-center items-center bg-primary/10 mb-4 rounded-full w-16 h-16 text-primary">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="mb-2 font-semibold text-xl">No blogs found</h3>
            <p className="mb-6 text-muted-foreground">
              {searchTerm
                ? "Try a different search term"
                : showFeaturedOnly
                ? "No featured blogs available"
                : "Check back later for new content"}
            </p>
            {(searchTerm || showFeaturedOnly) && (
              <Button onClick={resetFilters}>Reset Filters</Button>
            )}
          </motion.div>
        )}

        {/* Blog Grid */}
        {!isLoading && !isError && filteredBlogs.length > 0 && (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <Card className="group flex flex-col hover:shadow-lg border-border/50 h-full overflow-hidden transition-shadow duration-300">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        width={1980}
                        height={1024}
                        src={
                          blog.banner ||
                          `/placeholder.svg?height=300&width=600&text=${
                            encodeURIComponent(blog.title) || "/placeholder.svg"
                          }`
                        }
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {blog.featured && (
                        <Badge className="top-3 right-3 absolute bg-primary/80 hover:bg-primary">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="group-hover:text-primary line-clamp-2 transition-colors">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {calculateReadTime(blog.content)} min read
                          </span>
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow pb-4">
                      <p className="text-muted-foreground line-clamp-3">
                        {blog.description}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <Button
                        variant="outline"
                        className="group-hover:bg-primary w-full group-hover:text-primary-foreground transition-colors duration-300"
                        onClick={() =>
                          (window.location.href = `/blogs/${blog.id}`)
                        }
                      >
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load More - Infinite Scroll */}
        {hasMore && !isLoading && !isError && filteredBlogs.length > 0 && (
          <div
            ref={loadMoreRef}
            className="flex justify-center items-center mt-4 py-8"
          >
            {isLoadingMore ? (
              <div className="flex items-center gap-2">
                <div className="border-primary border-t-2 border-b-2 rounded-full w-5 h-5 animate-spin"></div>
                <span className="text-muted-foreground">
                  Loading more articles...
                </span>
              </div>
            ) : (
              <div className="flex justify-center items-center h-10 text-muted-foreground text-sm">
                Scroll for more articles
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
