using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace AntiDealerApi.Migrations
{
    public partial class AddReportTypetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReportTypeId",
                table: "Reports",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReportType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReportTypeId",
                table: "Reports",
                column: "ReportTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportType_ReportTypeId",
                table: "Reports",
                column: "ReportTypeId",
                principalTable: "ReportType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportType_ReportTypeId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "ReportType");

            migrationBuilder.DropIndex(
                name: "IX_Reports_ReportTypeId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ReportTypeId",
                table: "Reports");
        }
    }
}
