<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Helpers\Importer;

class ImportCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'importer:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import from a source table';

    protected $importer;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->importer = new Importer('m_user');
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->importer->import();
    }
}
