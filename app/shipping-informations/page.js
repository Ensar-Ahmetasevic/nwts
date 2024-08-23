"use client";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import dayjs from "dayjs";

import AllShippingData from "./../../components/pages/shipping-informations/all-shipping-data";

import useShippingInformationQuery from "../../requests/request-shipping-information/use-fetch-shipping-informations-query";

import { FaSearch } from "react-icons/fa";
import LoadingSpinnerButton from "./../../components/shared/loading-spiner-button";

export default function ShippingInformations() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to show per page

  const { data, isLoading, error } = useShippingInformationQuery();

  const shippingDatas = data?.shippingData || [];

  // Initialize React Hook Form
  const { register, handleSubmit, watch } = useForm();
  const searchQuery = watch("searchQuery", ""); // Watch the searchQuery input

  // Define the scrollToTop function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  // Scroll to top when the current page changes
  useEffect(() => {
    scrollToTop();
  }, [currentPage]); // Only run this effect when currentPage changes

  // Reset page to 1 whenever searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter all trucks with IN status and count them
  const inStatusCount = shippingDatas.filter(
    (truck) => truck.status === "IN",
  ).length;

  // Filter the data based on the search query
  const filteredData = shippingDatas.filter((truck) => {
    const filterByFullDate = dayjs(truck.entryDateTime).format("DD-MM-YYYY");
    const filterByYear = dayjs(truck.entryDateTime).format("YYYY");
    const filterByMonth = dayjs(truck.entryDateTime).format("MM");
    const filterByDay = dayjs(truck.entryDateTime).format("DD");

    const lowerCaseQuery = searchQuery.toLowerCase();

    // Check if the query starts with "D", "M", "Y", or is a full date
    if (lowerCaseQuery.startsWith("d")) {
      const dayQuery = lowerCaseQuery.slice(1); // Remove the "D" prefix
      return filterByDay === dayQuery;
    } else if (lowerCaseQuery.startsWith("m")) {
      const monthQuery = lowerCaseQuery.slice(1); // Remove the "M" prefix
      return filterByMonth === monthQuery;
    } else if (lowerCaseQuery.startsWith("y")) {
      const yearQuery = lowerCaseQuery.slice(1); // Remove the "Y" prefix
      return filterByYear === yearQuery;
    } else {
      // Check if it's a full date search
      return (
        truck.companyName.toLowerCase().includes(lowerCaseQuery) ||
        truck.status.toLowerCase() === lowerCaseQuery ||
        filterByFullDate === lowerCaseQuery
      );
    }
  });

  // Calculate the indices for slicing the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Handle next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Handle form submission
  const onSubmit = (data) => {
    setCurrentPage(1); // Reset to the first page when a new search is made
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinnerButton /> Loading data...
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-control w-full max-w-md space-y-3"
        >
          <div className="mx-auto space-x-2">
            <label htmlFor="searchShippings">Filter by:</label>
            <label className="font-semibold" htmlFor="searchShippings">
              Company Name, Date or Status
            </label>
          </div>
          <label className="input input-bordered input-primary flex items-center gap-2">
            <input
              className="grow"
              id="searchShippings"
              type="text"
              placeholder='e.g. "20-08-2024" or "D20" or "M08" or "Y2024"'
              {...register("searchQuery")}
            />
            <FaSearch />
          </label>
        </form>
      </div>

      <div className="divider mb-8 mt-16">All Shipping Informations</div>

      {/* Number of trucks with IN status */}
      <div className="flex justify-center">
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Number of trucks</div>
            <div className="stat-value">{inStatusCount}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Status</div>
            <div className="stat-value text-green-500">IN</div>
          </div>
        </div>
      </div>

      <main className="container mx-auto mb-12 flex-col items-center">
        <div className="px-20">
          {filteredData.length === 0 ? (
            <div className="text-center text-gray-500">
              No data found matching your search criteria.
            </div>
          ) : (
            <>
              <ul>
                {currentItems.map((truck) => (
                  <li key={truck.id}>
                    <AllShippingData
                      truck={truck}
                      isLoading={isLoading}
                      error={error}
                    />
                  </li>
                ))}
              </ul>
              <div className="join mt-12 flex justify-center">
                <button
                  className="btn join-item"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button className="btn join-item" onClick={() => scrollToTop()}>
                  Page {currentPage} of {totalPages}
                </button>
                <button
                  className="btn join-item"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
