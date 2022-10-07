export interface ListParams {
  limit?: number;
  page?: number;
}

export interface ListPackageBookingsParams extends ListParams {
  active_only?: boolean;
}
