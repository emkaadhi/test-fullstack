<?php

namespace App\Http\Controllers;

use App\Http\Resources\BorrowResource;
use App\Models\Borrow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BorrowController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $borrows = DB::table('borrows')
        ->leftJoin('customers as a','a.id','=','borrows.customer_id')
        ->leftJoin('books as b','b.id','=','borrows.book_id')
        ->orderBy('borrows.created_at','desc')
        ->get(['a.name','b.name as title','borrow_date']);

        $data['borrows'] = $borrows;

        return response()->json([
            'response_code' => '00',
            'response_message' => 'Borrow data success',
            'data' => $data
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            "book_id" => "required",
            "customer_id" => "required",
            "borrow_date" => "required",
        ]);

        if ($validator->fails()) {
            return $this->sendError('error validation', $validator->errors());
        }

        $borrow = Borrow::create($input);

        return $this->sendResponse(new BorrowResource($borrow), 'borrow add successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Borrow  $borrow
     * @return \Illuminate\Http\Response
     */
    public function show(Borrow $borrow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Borrow  $borrow
     * @return \Illuminate\Http\Response
     */
    public function edit(Borrow $borrow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Borrow  $borrow
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Borrow $borrow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Borrow  $borrow
     * @return \Illuminate\Http\Response
     */
    public function destroy(Borrow $borrow)
    {
        //
    }
}
