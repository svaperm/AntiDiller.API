using Microsoft.EntityFrameworkCore.Migrations;

namespace AntiDealerApi.Migrations
{
    public partial class RemoveStatusfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Reports");

            migrationBuilder.AddColumn<string>(
                name: "ReportType",
                table: "Reports",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReportType",
                table: "Reports");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Reports",
                type: "text",
                nullable: true);
        }
    }
}
