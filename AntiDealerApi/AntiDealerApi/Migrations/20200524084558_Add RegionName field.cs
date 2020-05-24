using Microsoft.EntityFrameworkCore.Migrations;

namespace AntiDealerApi.Migrations
{
    public partial class AddRegionNamefield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RegionName",
                table: "Reports",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegionName",
                table: "Reports");
        }
    }
}
