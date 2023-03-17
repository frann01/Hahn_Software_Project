
FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /source
COPY . .

RUN dotnet restore "./SzellnerAPI.csproj" --disable-parallel
RUN dotnet publish "./SzellnerAPI.csproj" -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal
WORKDIR /app
COPY --from=build /app ./

EXPOSE 3000

ENTRYPOINT ["dotnet", "SzellnerAPI.dll"]