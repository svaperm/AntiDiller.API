using Microsoft.EntityFrameworkCore.Migrations;

namespace AntiDealerApi.Migrations
{
    public partial class RenameReportTypetoReportStatus2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportTypes_ReportStatusId",
                table: "Reports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportTypes",
                table: "ReportTypes");

            migrationBuilder.RenameTable(
                name: "ReportTypes",
                newName: "ReportStatuses");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportStatuses",
                table: "ReportStatuses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportStatuses_ReportStatusId",
                table: "Reports",
                column: "ReportStatusId",
                principalTable: "ReportStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ReportStatuses_ReportStatusId",
                table: "Reports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReportStatuses",
                table: "ReportStatuses");

            migrationBuilder.RenameTable(
                name: "ReportStatuses",
                newName: "ReportTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReportTypes",
                table: "ReportTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ReportTypes_ReportStatusId",
                table: "Reports",
                column: "ReportStatusId",
                principalTable: "ReportTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
