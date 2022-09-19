<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// route api untuk buku
Route::resource('books',BookController::class);

// route api untuk customer/pengguna
Route::resource('customers',CustomerController::class);

// route api untuk dashboard
Route::get('/sixmonth',[DashboardController::class,'bookSixMonth']);
Route::get('/onemonth',[DashboardController::class,'bookOneMonth']);
Route::get('/mostborrow',[DashboardController::class,'mostBorrow']);

// route api untuk peminjaman
Route::get('/borrow',[BorrowController::class,'index']);
Route::post('/borrow',[BorrowController::class,'store']);
