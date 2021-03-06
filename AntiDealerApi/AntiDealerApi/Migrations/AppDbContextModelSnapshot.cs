﻿// <auto-generated />
using System;
using AntiDealerApi.Domain.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AntiDealerApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("AntiDealerApi.Domain.Models.Report", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<double>("Latitude")
                        .HasColumnType("double precision");

                    b.Property<double>("Longitude")
                        .HasColumnType("double precision");

                    b.Property<string>("RegionName")
                        .HasColumnType("text");

                    b.Property<int?>("ReportPhotoId")
                        .HasColumnType("integer");

                    b.Property<int?>("ReportStatusId")
                        .HasColumnType("integer");

                    b.Property<string>("ReportType")
                        .HasColumnType("text");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ReportPhotoId");

                    b.HasIndex("ReportStatusId");

                    b.HasIndex("UserId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("AntiDealerApi.Domain.Models.ReportPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<byte[]>("Photo")
                        .HasColumnType("bytea");

                    b.HasKey("Id");

                    b.ToTable("ReportPhotos");
                });

            modelBuilder.Entity("AntiDealerApi.Domain.Models.ReportStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ReportStatuses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "В обработке"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Выполнено"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Отказано"
                        });
                });

            modelBuilder.Entity("AntiDealerApi.Domain.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("text");

                    b.Property<string>("Salt")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AntiDealerApi.Domain.Models.Report", b =>
                {
                    b.HasOne("AntiDealerApi.Domain.Models.ReportPhoto", "ReportPhoto")
                        .WithMany()
                        .HasForeignKey("ReportPhotoId");

                    b.HasOne("AntiDealerApi.Domain.Models.ReportStatus", "ReportStatus")
                        .WithMany()
                        .HasForeignKey("ReportStatusId");

                    b.HasOne("AntiDealerApi.Domain.Models.User", "User")
                        .WithMany("Reports")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
