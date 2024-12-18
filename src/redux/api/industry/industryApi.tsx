import { baseApi } from "../api";

const industryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createIndustry: builder.mutation({
      query: (data) => ({
        url: "/industry/create-industry",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["industry"],
    }),
    deleteIndustry: builder.mutation({
      query: (industryId) => ({
        url: `/industry/${industryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["industry"],
    }),
    getIndustry: builder.query({
      query: () => {
        return {
          url: "/industry",
        };
      },
      providesTags: ["industry"],
    }),
  }),
});

export const {
  useCreateIndustryMutation,
  useDeleteIndustryMutation,
  useGetIndustryQuery,
} = industryApi;
