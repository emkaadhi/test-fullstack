<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    // fungsi untuk mendaptkan data jumlah buku dalam 6 bulan terakhir
    public function bookSixMonth()
    {
        $to = Carbon::now()->endOfMonth();
        $from = Carbon::now()->startOfMonth()->subMonth(6);

        $result = DB::table('borrows')
            ->selectRaw('count(*) as Jumlah')
            ->whereBetween('borrow_date',[$from,$to])
            ->get();

        $data['result'] = $result;

        return response()->json([
            'response_code' => '00',
            'response_message' => 'Jumlah Peminjaman selama 6 bulan berhasil ditampilkan',
            'data' => $data
        ], 200);
    }

    // fungsi untuk mendaptkan data jumlah buku dalam 1 bulan

    public function bookOneMonth()
    {
        $to = Carbon::now()->endOfMonth();
        $from = Carbon::now()->startOfMonth();

        $result = DB::table('borrows')
            ->selectRaw('count(*) as Jumlah')
            ->whereBetween('borrow_date',[$from,$to])
            ->get();

        $data['result'] = $result;

        return response()->json([
            'response_code' => '00',
            'response_message' => 'Jumlah Peminjaman dalam bulan ini berhasil ditampilkan',
            'data' => $data
        ], 200);
    }

    // fungsi untuk mendaptkan data peminjam terbanyak (5 user)

    public function mostBorrow()
    {

        $results = DB::table('borrows')
        ->selectRaw('count(*) as jumlah ,a.name')
        ->leftJoin('customers as a','a.id','=','borrows.customer_id')
        ->groupBy('borrows.customer_id')
        ->orderBy('jumlah','desc')
        ->limit(5)
        ->get();

        $data['results'] = $results;

        return response()->json([
            'response_code' => '00',
            'response_message' => 'Peminjam terbanyak berhasil ditampilkan',
            'data' => $data
        ], 200);
        
    }
}
